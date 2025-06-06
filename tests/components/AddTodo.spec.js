import { mount } from '@vue/test-utils'
import AddTodo from '@/components/AddTodo.vue'

describe('AddTodo.vue', () => {
  it('рендерит форму с input и кнопкой', () => {
    const wrapper = mount(AddTodo)
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('Create')
  })

  it('не вызывает $emit, если поле пустое', async () => {
    const wrapper = mount(AddTodo)
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.emitted('add-todo')).toBeFalsy()
  })

  it('вызывает $emit с новым todo, если введено значение', async () => {
    const wrapper = mount(AddTodo)
    const input = wrapper.find('input')

    await input.setValue('Купить хлеб')
    await wrapper.find('form').trigger('submit.prevent')

    const emitted = wrapper.emitted('add-todo')
    expect(emitted).toBeTruthy()
    expect(emitted[0][0]).toMatchObject({
      title: 'Купить хлеб',
      completed: false
    })

    // Проверяем, что поле очищается после сабмита
    expect(wrapper.vm.title).toBe('')
  })
})
