// axios 는 html 파일에서 cdn 으로 사용.

// async await 서버에 요청하는 것 = 비동기이므로 사용
async function getUsers() {
  try {
    const res = await axios.get('/users')
    const users = res.data
    const list = document.getElementById('list')
    list.innerHTML = '' // 렌더링시 항상 비우고 다시 가져옴.
    // 유저들마다 key 값을
    Object.keys(users).map(function (key) {
      const userDiv = document.createElement('div')

      const span = document.createElement('span')
      span.textContent = users[key] // value 값 즉 유저이름을 적는다.

      // 유저 수정
      const edit = document.createElement('button')
      edit.textContent = '수정'
      edit.addEventListener('click', async () => {
        const name = prompt('바꿀 이름을 입력하세요.')
        if (!name) {
          return alert('이름을 입력해 주세요.')
        }
        try {
          await axios.put('/user/' + key, { name })
          getUsers() // 수정후 다시 렌더링
        } catch (e) {
          console.error(e)
        }
      })
      // 유저 삭제
      const remove = document.createElement('button')
      remove.textContent = '삭제'
      remove.addEventListener('click', async () => {
        if (!confirm('정말 삭제 하시겠습니까?')) {
          return
        }
        try {
          await axios.delete('/user/', key)
          getUsers()
        } catch (e) {
          console.error(e)
        }
      })
      userDiv.appendChild(span)
      userDiv.appendChild(edit)
      userDiv.appendChild(remove)
      list.appendChild(userDiv)
      console.log(res.data)
    })
  } catch (e) {
    console.error(e)
  }
}

window.onload = getUsers

document.getElementById('form').addEventListener('submit', async e => {
  e.preventDefault()
  const name = e.target.username.value
  if (!name) {
    return alert('이름을 입력하세요.')
  }
  try {
    await axios.post('/user', { name })
    getUsers()
  } catch (e) {
    console.error(e)
  }
  e.target.username.value = ''
})
