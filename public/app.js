let chats = document.querySelector(".chats");
let dlt_btns = document.querySelectorAll(".dlt-btn");

let delete_card = document.createElement("div");
let heading = document.createElement("h1");
let cancel_btn = document.createElement("button");
let ok_btn = document.createElement("button");

heading.innerText = "Are you sure for deletion?";
cancel_btn.innerText = "Cancel";
ok_btn.innerText = "OK";

delete_card.append(heading);
delete_card.append(cancel_btn);
delete_card.append(ok_btn);

delete_card.classList.add("dlt-card");

let currentForm = null;   

for (let btn of dlt_btns) {
    btn.addEventListener("click", (event) => {
        event.preventDefault();

        currentForm = btn.closest("form");

        document.body.append(delete_card);
        chats.classList.add("blur");
    });
}

ok_btn.addEventListener("click", () => {
    if (currentForm) {
        currentForm.submit();
    }
});

cancel_btn.addEventListener("click", () => {
    delete_card.remove();
    chats.classList.remove("blur");
    currentForm = null;
});
