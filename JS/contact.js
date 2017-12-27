const KEY = 'RAJ0008';
let cotacts = [];
const init = function () {
    if (!localStorage.getItem(KEY)) {
        cotacts = contactStarter;
        localStorage.setItem(KEY, JSON.stringify(contactStarter));
    } else {
        cotacts = JSON.parse(localStorage.getItem(KEY));
    }
    updateList();
    document.querySelector('.fab').addEventListener('click', showForm);
    document.querySelector('#button-save').addEventListener('click', addContact);
    document.querySelector('#button-cancel').addEventListener('click', hideForm);

}
const updateList = function () {
    let ul = document.querySelector('ul.contacts');
    ul.innerHTML = "";
    let df = new DocumentFragment();

    cotacts.forEach((cotact) => {
        df.appendChild(createItem(cotact));
    });
    ul.appendChild(df);
}
const createItem = function (contact) {
    let li = document.createElement('li');
    li.className = 'contact';
        li.setAttribute("data-person", contact.id);
    let span = document.createElement('span');
    span.className = 'delete';
    span.setAttribute('data-key', contact.email);
    span.addEventListener('click', removeContact);
    li.appendChild(span);
    let h3 = document.createElement('h3');
    h3.textContent = contact.fullname;
    h3.addEventListener('click', showForm);
    li.appendChild(h3);
    let pe = document.createElement('p');
    pe.className = 'email';
    li.appendChild(pe);
    pe.textContent = contact.email;
    let pp = document.createElement('p');
    pp.className = 'phone';
    pp.textContent = contact.phone;
    li.appendChild(pp);
    return li;
}
const showForm = function (ev) {
    ev.preventDefault();
    document.querySelector('main').style.opacity = '0';
    document.querySelector('.fab').style.opacity = '0';
    document.querySelector('.contactform').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';

}
const hideForm = function (ev) {
    ev.preventDefault();
    document.querySelector('main').style.opacity = '1';
    document.querySelector('.fab').style.opacity = '1';
    document.querySelector('.contactform').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
}
const addContact = function (ev) {
    
    ev.preventDefault();
    let btn = ev.currentTarget; 
            let id = btn.getAttribute('data-id');
    let selectedPerson = null;
  cotacts.forEach(person=>{
        if( person.id == id){
            selectedPerson = person;
            console.log("person",selectedPerson);
        }
    });
     if(selectedPerson != null){
        let input_name = document.getElementById('input-name');
        let input_email = document.getElementById('input-email');
        let input_phone = document.getElementById('input-phone');
         
        input_name.value = selectedPerson.fullname;
        input_email.value = selectedPerson.email;
         input_phone.value =selectedPerson.phone;
         hideForm(new MouseEvent('click'));
        let btn = document.getElementById('button-save');
        btn.setAttribute('data-id', selectedPerson.id);
        updateList();
    }else{
        //such bad. no person
    

        let obj = {};
                 let id = Math.floor(Math.random() * 1000) + 12333;

        let fullname = document.getElementById('input-name').value.trim();
        let email = document.getElementById('input-email').value.trim();
        let phone = document.getElementById('input-phone').value.trim();
        if (id && fullname && email && phone) {
            obj = {
                id,
                fullname,
                email,
                phone
            };
            cotacts.push(obj);
            localStorage.setItem(KEY, JSON.stringify(cotacts));
            document.querySelector('.contactform form').reset();
            hideForm(new MouseEvent('click'));
            let btn = document.getElementById('button-save');
        btn.setAttribute('data-id',id);
            updateList();
        } else {
            alert('Form not filled in');
        }
   
    document.getElementById('input-name').value ="";
    document.getElementById('input-phone').value ="";
    document.getElementById('input-email').value ="";
        document.getElementById('button-save').setAttribute('data-person', "0");
    }
}
const removeContact = function (ev) {
    ev.preventDefault();
    let email = ev.target.getAttribute('data-key');
    console.log(email);
    cotacts = cotacts.filter((contact) => {
        //        console.log(contact.email, email)
        return !(contact.email == email);
    });
    console.log(cotacts)
    localStorage.setItem(KEY, JSON.stringify(cotacts));
    updateList();
}
document.addEventListener('DOMContentLoaded', init);
