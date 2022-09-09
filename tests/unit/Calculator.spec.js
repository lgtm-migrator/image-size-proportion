import { mount } from '@vue/test-utils'
import Calculator from "@/components/Calculator.vue"

describe("Calculator", () => {
  it("renders", () => {
    const wrapper = mount(Calculator)
    expect(wrapper.contains('div')).toBe(true)
  })
})
