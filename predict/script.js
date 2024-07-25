document.getElementById('predictionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Get user inputs
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const address = document.getElementById('address').value;

    // Get selected symptoms based on checkbox choice
    const selectedSymptoms = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(function(checkbox) {
        selectedSymptoms.push(checkbox.value);
    });

    // Check if any symptoms are selected
    if (selectedSymptoms.length === 0) {
        alert("Please select at least one symptom before diagnosis.");
        return;
    }

    // Calculate likelihood and stage of heart disease
    const probability = diagnoseHeartDiseaseLikelihood(selectedSymptoms);
    const stage = predictHeartDiseaseStage(selectedSymptoms);

    // Display result
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<div style= "margin-top:5px" >
        <p>Hello ${name},</p>
        <p>Based on your symptoms, there is a ${probability.toFixed(1)}% chance of having Chronic Heart Disease.</p>
        <p>Your predicted stage of Heart Disease is: ${stage}</p>
        <p>Age: ${age}</p>
        <p>Address: ${address}</p>
        <button id="printButton">Print</button>
    </div>`;

    // Add event listener to the print button
    document.getElementById('printButton').addEventListener('click', printResult);
});

function diagnoseHeartDiseaseLikelihood(selectedSymptoms) {
    let probability = 0;

    // Adjust probability based on symptoms
    if (selectedSymptoms.includes('chest_pain')) {
        probability += 30;
    }
    if (selectedSymptoms.includes('shortness_of_breath')) {
        probability += 25;
    }
    if (selectedSymptoms.includes('fatigue')) {
        probability += 20;
    }
    if (selectedSymptoms.includes('palpitations')) {
        probability += 15;
    }
    if (selectedSymptoms.includes('swelling')) {
        probability += 10;
    }
    if (selectedSymptoms.includes('dizziness')) {
        probability += 10;
    }
    if (selectedSymptoms.includes('nausea')) {
        probability += 5;
    }
    if (selectedSymptoms.includes('body_pain')) {
        probability += 5;
    }
    if (selectedSymptoms.includes('sweating')) {
        probability += 5;
    }
    if (selectedSymptoms.includes('cough')) {
        probability += 5;
    }
    if (selectedSymptoms.includes('fainting')) {
        probability += 5;
    }
    if (selectedSymptoms.includes('ankle_swelling')) {
        probability += 10;
    }
    if (selectedSymptoms.includes('irregular_heartbeat')) {
        probability += 20;
    }
    if (selectedSymptoms.includes('pain_in_neck')) {
        probability += 10;
    }

    // Cap the probability at a maximum of 100%
    probability = Math.min(100, probability);

    return probability;
}

function predictHeartDiseaseStage(selectedSymptoms) {
    let stage = "Early";

    // Determine the stage of heart disease based on symptoms
    if (selectedSymptoms.includes('shortness_of_breath') ||
        selectedSymptoms.includes('chest_pain') ||
        selectedSymptoms.includes('irregular_heartbeat') ||
        selectedSymptoms.includes('swelling') ||
        selectedSymptoms.includes('dizziness')) {
        stage = "Chronic Heart Disease" + "<br>" +
            "Your condition indicates Chronic Heart Disease, requiring ongoing management and regular consultations with your healthcare provider." + "<br>"
        "Comment: Chronic Heart Disease requires a comprehensive treatment plan including lifestyle changes and medication.";
    } else if (selectedSymptoms.includes('palpitations') ||
        selectedSymptoms.includes('fatigue') ||
        selectedSymptoms.includes('nausea') ||
        selectedSymptoms.includes('body_pain') ||
        selectedSymptoms.includes('sweating')) {
        stage = "Moderate Heart Disease" + "<br>" +
            "Your symptoms suggest Moderate Heart Disease, which may require medication and lifestyle changes." + "<br>"
        "Comment: Moderate Heart Disease can be managed effectively with proper treatment and lifestyle modifications.";
    } else if (selectedSymptoms.includes('cough') ||
        selectedSymptoms.includes('fainting') ||
        selectedSymptoms.includes('ankle_swelling')) {
        stage = "Early Stage Heart Disease" + "<br>" +
            "Your symptoms suggest an early stage of Heart Disease. It's important to monitor your condition and consult with a healthcare provider." + "<br>"
        "Comment: Early intervention can prevent progression to more severe stages of heart disease.";
    }
    return stage;
}

function printResult() {
    // Get the result div content
    const resultContent = document.getElementById('result').innerHTML;
    // Open a new window
    const printWindow = window.open('', '_blank');
    // Write the content to the new window
    printWindow.document.write(`
        <html>
        <head>
            <title>Print Result</title>
            <!-- Bootstrap CSS -->
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
            <!-- Your custom CSS -->
            <link rel="stylesheet" href="styles.css">
       

        </head>
        <body>
            <div class="container">
                <div class="card mt-5">
                    <div class="card-body">
                        <center><h2 class="card-title text-center">Chronic Heart Disease Prediction System</h2>
                        <h4 class="card-title text-center">RESULT</h4><center>
                        <hr>
            <div class="border" style="background-color: #c8dce6;">
     ${resultContent}
    </div>


                    </div>
                </div>
            </div>
         <center>   <footer>
            <div class="text-center text-white mt-3">
            <p>All rights reserved &copy; 2024 Chronic Heart Disease Prediction System || Gabriel Tersee Tsaviv</p>
        </div>
    </footer></center>
            <!-- Bootstrap JS -->
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
            <!-- Your custom script -->
            <script src="script.js"></script>
        </body>
        </html>
    `);
    // Print the window
    printWindow.print();
}

document.getElementById('resetButton').addEventListener('click', function() {
    if (confirm("Are you sure you want to reset and predict again?")) {
        document.getElementById('predictionForm').reset();
    }
});

document.getElementById('logoutButton').addEventListener('click', function() {
    if (confirm("Are you sure you want to log out?")) {
        window.location.href = "../index.html"; // Redirect to the login page
    }
});