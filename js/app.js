const inputId = document.querySelector("#id");
const form = document.querySelector("form");
const postAndComments = document.querySelector('.postAndComments')
function setError(input, msg) {
    const errorField = input
        .closest(".inputControls")
        .querySelector(".errorField");
    errorField.innerHTML = msg;
    if (input.classList.contains("success")) {
        input.classList.remove("success");
    }
    input.classList.add("error");
}
function setSuccess(input) {
    const errorField = input
        .closest(".inputControls")
        .querySelector(".errorField");
    if (input.classList.contains("error")) {
        input.classList.remove("error");
    }
    input.classList.add("success");
    errorField.innerHTML = "";
}
function validation(bool, value, input) {
    if (value === "") {
        bool = false;
        setError(input, "поле пусте");
    } else if (value > 100) {
        bool = false;
        setError(input, "значення більше 100");
    } else if (value < 1) {
        bool = false;
        setError(input, "значення менше 0 або саме є нулем");
    } else {
        setSuccess(input);
    }
    return bool
}
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const idValue = inputId.value.trim();
    let bool = true;
    bool = validation(bool, idValue, inputId)
    // if (bool) {
    //     const posts = fetch(`https://jsonplaceholder.typicode.com/posts/${idValue}`)
    //         .then(data => data.json())
    //         .catch((error) => console.log(error))
    //     const comments = fetch(`https://jsonplaceholder.typicode.com/comments?postId=${idValue}`)
    //         .then(data => data.json())
    //     Promise.all([posts, comments])
    //         .then(([posts, comments]) => {
    //             console.log(posts, comments)
    //         })
    //         .catch((error) => console.log(error))
    // }
    // .then(fetch(`https://jsonplaceholder.typicode.com/comments?postId=${idValue}`)
    //     .then(data => data.json())
    //     .then(comments=>console.log(comments)))
    // .catch(error=>console.log("Error: " +error))
    // resolve(post)
    if (bool) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${idValue}`)
            .then(data => data.json())
            .then(post => {
                clearField()
                postAndComments.insertAdjacentHTML('afterbegin', `
                        <div class='post'>
                            <h3>${post.title}</h3>
                            <p class='desc'>${post.body}</p>
                        </div>
                    `)
            })
            .then(async ()=>{
                const data = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${idValue}`);
                const comment = await data.json();
                comment.forEach(createComment);
            }
            ).catch(error => console.log("Error: " + error))
    }
});

function createComment(element) {
    document.querySelector('.comments').insertAdjacentHTML("beforeend", `
        <div class='comment'>
            <h5>${element.name}</h5>
            <p>${element.email}</p>
            <p class='commentText'>${element.body}</p>
        </div>
    `)
}
function clearField() {
    postAndComments.innerHTML = ''
    postAndComments.insertAdjacentHTML('afterbegin', `<div class="comments" style='padding:20px'>
    </div>`)
}
