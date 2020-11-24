const cep = document.getElementById('cep');

const fillForm = data => {
    for(const field in data){

        let element = document.getElementById(field);
        if (element) element.value = data[field];
        
    }
}

const onlyNumbers = string => string.replace(/[^0-9]/g,'');

const validate = cep => /^[0-9]{8}$/.test(cep);

cep.addEventListener('blur', event => {

    let search = onlyNumbers(cep.value);

    if (!validate(search)) return false;

    fetch(`https://viacep.com.br/ws/${search}/json/`, {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    })
    .then(resp => resp.json().then(data => fillForm(data)))
    .catch(error => console.log(error));

});