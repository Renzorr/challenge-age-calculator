const $form = document.querySelector("form")
const $inputDay = document.querySelector(".day")
const $inputMonth = document.querySelector(".month")
const $inputYear = document.querySelector(".year")
const $inputFields = document.querySelectorAll("input")
const $resultYear = document.querySelector(".result-year")
const $resultMonth = document.querySelector(".result-month")
const $resultDay = document.querySelector(".result-day")

const date = new Date()
const currentYear = date.getFullYear()
const currentMonth = date.getMonth() + 1
const currentDay = date.getDate()

let inputYear = 0
let inputMonth = 0
let inputDay = 0

function maskInputRange(element, startValue, endValue) {
    IMask(element, {
        mask: IMask.MaskedRange,
        from: startValue,
        to: endValue
    })
}

function getDaysOfMonth(month, year) {
    return new Date(year, month, 0).getDate()
}

function calculateChronologicalAge(day, month, year) {
    let resultYear = currentYear - year
    let resultMonth = currentMonth - month
    let resultDay = currentDay - day

    if (currentMonth < month || (currentMonth === month && currentDay < day)) {
        resultYear--
    }

    if (resultMonth <= 0) {
        resultMonth += 12
    }

    if (resultDay < 0) {
        resultDay += getDaysOfMonth(currentMonth, currentYear)
        resultMonth--
    }

    resultYear.textContent = resultYear
    resultMonth.textContent = resultMonth
    resultDay.textContent = resultDay
}

function validateInputs() {
    let hasError = false
    inputFields.forEach((input) => {
        if (input.value.trim() === "" || parseInt(input.value) < 0) {
            hasError = true
            input.parentElement.classList.add("error")
        } else {
            input.parentElement.classList.remove("error")
        }
    })
    return hasError
}

maskInputRange(inputDay, 1, 31)
maskInputRange(inputMonth, 1, 12)
maskInputRange(inputYear, 1500, currentYear)

inputDay.addEventListener("input", (e) => {
    inputDay = parseInt(e.target.value) || 0
})

inputMonth.addEventListener("input", (e) => {
    inputMonth = parseInt(e.target.value) || 0
})

inputYear.addEventListener("input", (e) => {
    inputYear = parseInt(e.target.value) || 0
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (!validateInputs()) {
        calculateChronologicalAge(inputDay, inputMonth, inputYear)
    }
})
