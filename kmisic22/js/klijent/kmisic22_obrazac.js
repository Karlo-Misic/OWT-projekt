document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const submitBtn = document.querySelector('button[type="submit"]');

    // Funkcija za validaciju forme
    function validateForm() {
        let isValid = true;

        // Validacija inputa
        const inputs = form.querySelectorAll('input, select, textarea, datalist');
        inputs.forEach(input => {
            const errorSpan = document.getElementById(`${input.id}_error`);
            const label = document.querySelector(`label[for="${input.id}"]`);
            if ((!input.value || !input.value.trim()) && !input.checked && input.tagName !== 'DATALIST') {
                isValid = false;
                if (errorSpan) {
                    errorSpan.innerText = 'Ovo polje je obavezno';
                    errorSpan.style.display = 'inline';
                }
                if (label) {
                    label.classList.add('error-label');
                }
                input.classList.add('input-error');
            } else {
                if (errorSpan) {
                    errorSpan.innerText = '';
                    errorSpan.style.display = 'none';
                }
                if (label) {
                    label.classList.remove('error-label');
                }
                input.classList.remove('input-error');
            }
        });

        // Validacija optiongroup
        const selectElement = document.getElementById('karte');
        const selectedOptions = Array.from(selectElement.selectedOptions);
        const optionGroups = Array.from(selectElement.getElementsByTagName('optgroup'));
        const selectedGroups = new Set(selectedOptions.map(option => option.parentNode));
        
        const karteErrorSpan = document.getElementById('karte_error');
        const karteLabel = document.querySelector('label[for="karte"]');
        
        const allGroupsSelected = optionGroups.every(group => {
            const groupOptions = Array.from(group.getElementsByTagName('option'));
            return groupOptions.some(option => option.selected);
        });
        
        if (!allGroupsSelected || selectedOptions.length === 0) {
            isValid = false;
            karteErrorSpan.innerText = 'Molimo odaberite barem jednu opciju iz svake grupe.';
            karteErrorSpan.style.display = 'inline';
            karteErrorSpan.style.color = 'red';
            karteLabel.style.color = 'red';
            karteLabel.style.fontWeight = 'bold';

        } else {
            karteErrorSpan.innerText = '';
            karteErrorSpan.style.display = 'none';
            karteLabel.style.color = '';
            karteLabel.style.fontWeight = '';
        }
        
        // Validacija checkboxova
        const suglasnosti = form.querySelectorAll('input[type="checkbox"]');
        const suglasnostiChecked = Array.from(suglasnosti).some(checkbox => checkbox.checked);
        const suglasnostiErrorSpan = document.getElementById('suglasnosti_error');
        const suglasnostiHeading = document.getElementById('suglasnosti_heading');

        if (!suglasnostiChecked) {
            isValid = false;
            suglasnostiErrorSpan.innerText = 'Molimo odaberite barem jednu suglasnost.';
            suglasnostiErrorSpan.style.display = 'inline';
            suglasnostiHeading.style.color = 'red';
            suglasnostiHeading.style.fontWeight = 'bold';
        } else {
            suglasnostiErrorSpan.innerText = '';
            suglasnostiErrorSpan.style.display = 'none';
            suglasnostiHeading.style.color = '';
            suglasnostiHeading.style.fontWeight = '';
        }

        // Validacija "Preko čega ste ispunili formu"
        const prekoCega = form.querySelector('input[list="uredaj"]');
        const prekoCegaErrorSpan = document.getElementById('uredaj_error');
        const prekoCegaLabel = document.querySelector('label[for="uredaj"]');

        if (!prekoCega || !prekoCega.value || !prekoCega.value.trim()) {
            isValid = false;
            prekoCegaErrorSpan.innerText = 'Ovo polje je obavezno';
            prekoCegaErrorSpan.style.display = 'inline';
            if (prekoCegaLabel) {
                prekoCegaLabel.classList.add('error-label');
                prekoCegaLabel.style.color = 'red';
            }
        } else {
            prekoCegaErrorSpan.innerText = '';
            prekoCegaErrorSpan.style.display = 'none';
            if (prekoCegaLabel) {
                prekoCegaLabel.classList.remove('error-label');
                prekoCegaLabel.style.color = '';
            }
        }

        // Validacija datum
        isValid = validateDate() && isValid;

        // Validacija broja
        isValid = validateNumberInput() && isValid;

        // Validacija komentara
        isValid = validateComment() && isValid;

        // Validacija cijele forme
        if (!isValid) {
            const errorSummary = document.getElementById('error-summary');
            if (errorSummary) {
                errorSummary.innerText = 'Molimo ispunite formu do kraja!';
                errorSummary.style.display = 'block';
            }
        }

        submitBtn.disabled = !isValid;

        return isValid;
    }

    function validateDate() {
        const datumInput = document.getElementById('datum');
        const datumErrorSpan = document.getElementById('datum_error');
        const datumErrorLabel = document.querySelector('label[for="datum"]');
        const selectedDate = new Date(datumInput.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const earliestDate = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);
        const latestDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

        if (selectedDate < earliestDate || selectedDate > latestDate) {
            datumErrorSpan.innerText = 'Odaberite datum najranije 2 dana u budućnosti i najkasnije 1 mjesec u budućnosti.';
            datumErrorSpan.style.display = 'inline';
            datumErrorLabel.style.color = "red";
            datumErrorLabel.style.fontWeight = 'bold';
            return false;
        } else {
            datumErrorSpan.innerText = '';
            datumErrorSpan.style.display = 'none';
            datumErrorLabel.style.color = "";
            datumErrorLabel.style.fontWeight = '';
            return true;
        }
    }

    // Validacija brojeva
    function validateNumberInput() {
        const input = document.getElementById('korisnikovBroj').valueAsNumber;
        const errorSpan = document.getElementById('broj_error');
        const brojErrorLabel = document.querySelector('label[for="broj"]');

        if (isNaN(input) || input < 10 || input > 1000) {
            errorSpan.innerText = 'Unesite broj između 10 i 1000.';
            errorSpan.style.display = 'inline';
            brojErrorLabel.style.color = "red";
            brojErrorLabel.style.fontWeight = "bold";
            return false;
        } else {
            errorSpan.innerText = '';
            errorSpan.style.display = 'none';
            brojErrorLabel.style.color = "";
            brojErrorLabel.style.fontWeight = "";
            return true;
        }
    }

    // Validacija komentara
    function validateComment() {
        const textArea = document.getElementById('komentar');
        const text = textArea.value.trim();
        const komentarErrorSpan = document.getElementById('komentar_error');
        const labelForKomentar = document.querySelector('label[for="komentar"]');
        const regex = /^[A-Z][^<>#\-]*(?:[.!?]\s|$)/;
        const sentences = text.split(/[.!?]/).filter(sentence => sentence.trim() !== '');
        let isValid = true;

        komentarErrorSpan.innerText = '';
        komentarErrorSpan.style.display = 'none';
        labelForKomentar.classList.remove('error-label');

        if (sentences.length !== 4) {
            komentarErrorSpan.innerText = 'Tekst mora sadržavati točno 4 rečenice.';
            komentarErrorSpan.style.display = 'inline';
            labelForKomentar.classList.add('error-label');
            isValid = false;
        } else {
            sentences.forEach((sentence, index) => {
                const isValidSentence = regex.test(sentence.trim());
                if (!isValidSentence) {
                    komentarErrorSpan.innerText += ` Rečenica ${index + 1} nije ispravno oblikovana.`;
                    komentarErrorSpan.style.display = 'inline';
                    labelForKomentar.classList.add('error-label');
                    isValid = false;
                }
            });

            const lastCharacter = text.trim().slice(-1);
            if (!['.', '!', '?'].includes(lastCharacter)) {
                komentarErrorSpan.innerText += ' Posljednja rečenica mora završavati točkom, upitnikom ili uskličnikom.';
                komentarErrorSpan.style.display = 'inline';
                labelForKomentar.classList.add('error-label');
                isValid = false;
            }
        }
        return isValid;
    }

    form.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('input', validateForm);
    });

    form.querySelector('input[list="uredaj"]').addEventListener('input', validateForm);
    form.querySelector('input[type="checkbox"]').addEventListener('change', validateForm);
    document.getElementById('datum').addEventListener('change', validateForm);
    document.getElementById('korisnikovBroj').addEventListener('input', validateForm);
    document.getElementById('komentar').addEventListener('input', validateForm);

    validateForm();

    // Submit
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm()) {
            form.submit();
        }
    });
});