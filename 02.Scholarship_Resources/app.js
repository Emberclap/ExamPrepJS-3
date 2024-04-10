window.addEventListener("load", solve);

function solve() {
  const [studentNameElement, universityElement, scoreEelement] = document.getElementsByTagName('input');
  const nextBtnElement = document.getElementById('next-btn');
  const previewListElement = document.getElementById('preview-list');
  const candidatesElement = document.getElementById('candidates-list');


  function createStudent(studentNameElement, universityElement, scoreEelement) {
    
    const studentName = studentNameElement.value;
    const university = universityElement.value;
    const score = scoreEelement.value;

    const liElement = document.createElement('li');
    liElement.classList.add('application');

    const articleELement = document.createElement('article');
    articleELement.innerHTML = `
      <h4>${studentName}</h4>
      <p>University: ${university}</p>
      <p>Score: ${score}</p> `

    const editButton = document.createElement('button');
    editButton.classList.add('action-btn', 'edit')
    editButton.textContent = 'edit';
    editButton.addEventListener('click', () => {
      studentNameElement.value = studentName;
      universityElement.value = university;
      scoreEelement.value = score;
      liElement.remove()
      nextBtnElement.disabled = false;
    })
    const applyButton = document.createElement('button');
    applyButton.classList.add('action-btn', 'apply')
    applyButton.textContent = 'apply';
    applyButton.addEventListener('click', () => {
      candidatesElement.appendChild(candidateApply(studentName, university, score))
      previewListElement.innerHTML = '';
      nextBtnElement.disabled = false;
    })
    liElement.appendChild(articleELement);
    liElement.appendChild(editButton);
    liElement.appendChild(applyButton);

    return liElement;
  }
  nextBtnElement.addEventListener('click', () => {
    if (studentNameElement.value === '' || universityElement.value === '' || scoreEelement.value === '') {
      return;
    }
    previewListElement.appendChild(createStudent(studentNameElement, universityElement, scoreEelement));
    clearInput()
    nextBtnElement.disabled = true;
  })

  function clearInput() {
    studentNameElement.value = '';
    universityElement.value = '';
    scoreEelement.value = '';
  }
  function candidateApply(studentName, university, score) {
    const liElement = document.createElement('li');
    liElement.classList.add('application');

    const articleELement = document.createElement('article');
    articleELement.innerHTML = `
      <h4>${studentName}</h4>
      <p>University: ${university}</p>
      <p>Score: ${score}</p> `

    liElement.appendChild(articleELement);
    return liElement;
  }

}
