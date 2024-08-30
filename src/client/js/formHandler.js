function handleSubmit(event) {
    event.preventDefault();
    let formText = document.getElementById('url').value;

    if (checkForURL(formText)) {
        console.log("::: Form Submitted :::");

        postData('http://localhost:8081/api', { url: formText })
            .then(res => {
                if (res) {
                
                    document.getElementById("polarity").innerHTML = `Polarity: ${res.score_tag || 'N/A'}`;
                    document.getElementById("agreement").innerHTML = `Agreement: ${res.agreement || 'N/A'}`;
                    document.getElementById("subjectivity").innerHTML = `Subjectivity: ${res.subjectivity || 'N/A'}`;
                    document.getElementById("confidence").innerHTML = `Confidence: ${res.confidence || 'N/A'}`;
                    document.getElementById("irony").innerHTML = `Irony: ${res.irony || 'N/A'}`;
                } else {
                    console.error('Error: Response is undefined');
                    document.getElementById("polarity").innerHTML = "Polarity: N/A";
                    document.getElementById("agreement").innerHTML = "Agreement: N/A";
                    document.getElementById("subjectivity").innerHTML = "Subjectivity: N/A";
                    document.getElementById("confidence").innerHTML = "Confidence: N/A";
                    document.getElementById("irony").innerHTML = "Irony: N/A";
                }
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById("polarity").innerHTML = "Polarity: Error";
                document.getElementById("agreement").innerHTML = "Agreement: Error";
                document.getElementById("subjectivity").innerHTML = "Subjectivity: Error";
                document.getElementById("confidence").innerHTML = "Confidence: Error";
                document.getElementById("irony").innerHTML = "Irony: Error";
            });
    } else {
        alert('Seems like an invalid URL, please try with a valid URL.');
    }
}


const postData = async (url = "", data = {}) => {
    console.log('Analyzing:', data);
    try {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const newData = await response.json();
        console.log('Data received:', newData);
        return newData;
    } catch (error) {
        console.log('Error:', error);
    }
};


function checkForURL(inputURL) {
    if (typeof inputURL !== 'string') {
        return false;
    }
    var regex = inputURL.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return regex != null;
}



export { handleSubmit, postData, checkForURL };
