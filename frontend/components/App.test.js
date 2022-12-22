// Write your tests here
import React from "react"
import * as rtl from "react-testing-library"
import 'jest-dom/extend-expect'
import AppFunctional from "./AppFunctional"
import AppClass from "./AppClass"


Copy code
it("Only accepts valid emails", () => {
  const { getByLabelText, getByText } = rtl.render(<AppClass />)
  const emailInput = getByLabelText("email")
  const submitButton = getByText("Submit")

  // Try to submit the form with an invalid email
  rtl.fireEvent.change(emailInput, { target: { value: "invalid" } })
  rtl.fireEvent.click(submitButton)

  // Check that the error message is displayed
  const errorMessage = getByText("Please enter a valid email")
  expect(errorMessage).toBeInTheDocument()

  // Try to submit the form with a valid email
  rtl.fireEvent.change(emailInput, { target: { value: "valid@email.com" } })
  rtl.fireEvent.click(submitButton)

  // Check that the error message is not displayed
  expect(errorMessage).not.toBeInTheDocument()
})