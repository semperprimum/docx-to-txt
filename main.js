const docxFileInput = document.getElementById("docxFileInput");
const convertButton = document.getElementById("convertButton");
const downloadLink = document.getElementById("downloadLink");

convertButton.addEventListener("click", function () {
  const file = docxFileInput.files[0];

  if (!file) {
    alert("Please select a .docx file.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    const docxData = event.target.result;

    mammoth
      .extractRawText({ arrayBuffer: docxData })
      .then(function (result) {
        const text = result.value;

        const blob = new Blob([text], { type: "text/plain" });

        const downloadUrl = URL.createObjectURL(blob);
        downloadLink.href = downloadUrl;
        downloadLink.download = file.name.replace(".docx", ".txt");
        downloadLink.style.display = "block";
      })
      .catch(function (error) {
        console.error("Error converting .docx to text:", error);
      });
  };

  reader.readAsArrayBuffer(file);
});
