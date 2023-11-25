document.querySelector("#submit").addEventListener("click", async (e) => {
  e.preventDefault()
  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;

  if (!username || !password) alert("Preencha todos os campos!");

  const response = await fetch(
    "https://6vjplm7l23.execute-api.sa-east-1.amazonaws.com/api/login",
    {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    const { accessToken } = await response.json()
    window.localStorage.setItem(
      "serverless-activities:accessToken",
      accessToken
    );

    window.location.href = "/";
  } else {
    alert("Usuário ou senha inválidos!");
  }
});
