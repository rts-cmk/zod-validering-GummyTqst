import z from "zod"
import { useState } from "react"
import "../Components/RegistrationForm.sass"
import registrationsSchema from "../schemas/registrationsSchema"
import { set } from "zod/mini"

export default function RegistrationForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthday: "",
        phone: "",
    })
    const [errors, setErrors] = useState({})

    const changeHandler = event => {
        const { name, value } = event.target

        const updatedFormData = {
            ...formData,
            [name]: value,
        }

        setFormData(updatedFormData)

        const result = registrationsSchema.safeParse(updatedFormData)

        if (result.success) {
            setErrors({})
        } else {
            const readableErrors = z.treeifyError(result.error)
            setErrors(readableErrors.properties)
        }
    }

    const submitHandler = event => {
        event.preventDefault()

        const result = registrationsSchema.safeParse(formData)

        if (result.success) {
            setErrors({})
            alert("Registration successful!")
        }
    }

    return (
        <form onSubmit={submitHandler} className="register-form">
            <fieldset className="register-form__fieldset">
                <legend className="register-form__legend">Registration Form</legend>

                <label className="register-form__label">
                    <span className="register-form__text">First name</span>
                    <input type="text" name="firstName" onChange={changeHandler} className="register-form__input" autoComplete="given-name" />
                    <ul className="register-form__error-list">
                        {errors.firstName?.errors.map(
                            (message, index) => <li key={index}>{message}</li>
                        )}
                    </ul>
                </label>

                <label className="register-form__label">
                    <span className="register-form__text">Last name</span>
                    <input type="text" name="lastName" onChange={changeHandler} className="register-form__input" autoComplete="family-name" />
                    <ul className="register-form__error-list">
                        {errors.lastName?.errors.map(
                            (message, index) => <li key={index}>{message}</li>
                        )}
                    </ul>
                </label>

                <label className="register-form__label">
                    <span className="register-form__text">Username</span>
                    <input type="text" name="username" onChange={changeHandler} className="register-form__input" autoComplete="family-name" />
                    <ul className="register-form__error-list">
                        {errors.username?.errors.map(
                            (message, index) => <li key={index}>{message}</li>
                        )}
                    </ul>
                </label>

                <label className="register-form__label">
                    <span className="register-form__text">Email</span>
                    <input type="email" name="email" onChange={changeHandler} className="register-form__input"  autoComplete="email" />
                    <ul className="register-form__error-list">
                        {errors.email?.errors.map(
                            (message, index) => <li key={index}>{message}</li>
                        )}
                    </ul>
                </label>

                <label className="register-form__label">
                    <span className="register-form__text">Password</span>
                    <input type="password" name="password" onChange={changeHandler} className="register-form__input" autoComplete="new-password" />
                    <ul className="register-form__error-list">
                        {errors.password?.errors.map(
                            (message, index) => <li key={index}>{message}</li>
                        )}
                    </ul>
                </label>

                <label className="register-form__label">
                    <span className="register-form__text">Confirm Password</span>
                    <input type="password" name="confirmPassword" onChange={changeHandler} className="register-form__input" autoComplete="new-password" />
                    <ul className="register-form__error-list">
                        {errors.confirmPassword?.errors.map(
                            (message, index) => <li key={index}>{message}</li>
                        )}
                    </ul>
                </label>

                <label className="register-form__label">
                    <span className="register-form__text">Birthday</span>
                    <input type="date" name="birthday" onChange={changeHandler} className="register-form__input" />
                    <ul className="register-form__error-list">
                        {errors.birthday?.errors.map(
                            (message, index) => <li key={index}>{message}</li>
                        )}
                    </ul>
                </label>

                <label className="register-form__label">
                    <span className="register-form__text">Phone Number</span>
                    <input type="tel" name="phone" onChange={changeHandler} className="register-form__input" autoComplete="tel" />
                    <ul className="register-form__error-list">
                        {errors.phone?.errors.map(
                            (message, index) => <li key={index}>{message}</li>
                        )}
                    </ul>
                </label>

            </fieldset>

            <button className="register-form__button">Register</button>
        </form>
    )
}