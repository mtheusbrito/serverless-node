const queryString = new URLSearchParams(window.location.search);
const resultId = queryString.get("id");

if (!window.localStorage.getItem("serverless-activities:accessToken")) {
  window.location.href = "/login.html";
}

const bail = () => {
  alert("Nenhum resultado encontrado");
  // window.location = '/'
};

if (!resultId) bail();

fetch(
  `https://6vjplm7l23.execute-api.sa-east-1.amazonaws.com/api/results/${resultId}`,
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem(
        "serverless-activities:accessToken"
      )}`,
    },
  }
)
  .then((r) => {
    if (!r.ok) bail();
    return r.json();
  })
  .then((result) => {
    document.getElementById("student-name").innerText = result.name;
    document.getElementById("correct").innerText = result.totalCorrectAnswers;
  })
  .catch((e) => {
    console.error(e);
    bail();
  });
