
document.addEventListener('DOMContentLoaded', function() {
    
    const doctors = {
        "Dr. Grace Montgomery": {
            name: "Dr. Grace Montgomery",
            specialty: "Cardiologist",
            experience: "5 years",
            image: "./an7.jpeg",
            bio: "Dr. Montgomery is a dedicated and compassionate medical professional with a strong commitment to patient care with years of experience in cardiology. She is one of the foremost cardiologists in Meridian Hospital, London.",
            patients: "6800+"
        },
        "Dr. Ethan Collins": {
            name: "Dr. Ethan Collins",
            specialty: "Neurosurgeon",
            experience: "8 years",
            image: "./an3.jpeg",
            bio: "Dr. Collins is a dedicated and compassionate medical professional with a strong commitment to patient care with years of experience in neurosurgery. He is one of the foremost neurosurgeons in Meridian Hospital, London.",
            patients: "8900+"
        },
        "Dr. Sophie Langston": {
            name: "Dr. Sophie Langston",
            specialty: "Optometrist",
            experience: "7 years",
            image: "./an8.jpeg",
            bio: "Dr. Langston is a dedicated and compassionate medical professional with a strong commitment to patient care with years of experience in optometry. She is one of the foremost optometrists in Meridian Hospital, London.",
            patients: "7100+"
        },
        "Dr. Liam Fletcher": {
            name: "Dr. Liam Fletcher",
            specialty: "Orthopedic Surgeon",
            experience: "10 years",
            image: "./an4.jpeg",
            bio: "Dr. Fletcher is a dedicated and compassionate medical professional with a strong commitment to patient care with years of experience in orthopedic surgery. He is one of the foremost orthopedic surgeons in Meridian Hospital, London.",
            patients: "11200+"
        },
        "Dr. Amelia Thornton": {
            name: "Dr. Amelia Thornton",
            specialty: "Pediatrician",
            experience: "6 years",
            image: "./an9.jpeg",
            bio: "Dr. Thornton is a dedicated and compassionate medical professional with a strong commitment to patient care with years of experience in pediatrics. She is one of the foremost pediatricians in Meridian Hospital, London.",
            patients: "6500+"
        },
        "Dr. Aarav Mehta": {
            name: "Dr. Aarav Mehta",
            specialty: "Psychiatrist",
            experience: "9 years",
            image: "./an5.jpeg",
            bio: "Dr. Mehta is a dedicated and compassionate medical professional with a strong commitment to patient care with years of experience in psychiatry. He is one of the foremost psychiatrists in Meridian Hospital, London.",
            patients: "7300+"
        },
        "Dr. Oliver Bennet": {
            name: "Dr. Oliver Bennet",
            specialty: "Dentist",
            experience: "7 years",
            image: "./an1.jpeg",
            bio: "Dr. Bennet is a dedicated and compassionate medical professional with a strong commitment to patient care with years of experience in dentistry. He is one of the foremost dentists in Meridian Hospital, London.",
            patients: "6200+"
        },
        "Dr. James Whitmore": {
            name: "Dr. James Whitmore",
            specialty: "Oncologist",
            experience: "6 years",
            image: "./an2.jpeg",
            bio: "Dr. Whitmore is a dedicated and compassionate medical professional with a strong commitment to patient care with years of experience in oncology. He is one of the foremost oncologists in Meridian Hospital, London.",
            patients: "7500+"
        },
        "Dr. Chloe Harrison": {
            name: "Dr. Chloe Harrison",
            specialty: "Gynaecologist",
            experience: "5 years",
            image: "./an6.jpeg",
            bio: "Dr. Harrison is a dedicated and compassionate medical professional with a strong commitment to patient care with years of experience in gynaecology. She is one of the foremost gynaecologists in Meridian Hospital, London.",
            patients: "5800+"
        }
    };

    // Get all view profile buttons
    const viewProfileButtons = document.querySelectorAll('.doctor-card button');
    
    // Add click event listener to each button
    viewProfileButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the doctor's name from the parent card
            const doctorCard = this.closest('.doctor-card');
            const doctorName = doctorCard.querySelector('.doctor-name').textContent;
            
            // Get the doctor's data
            const doctorData = doctors[doctorName];
            
            // Store data in localStorage to access it from the next page
            localStorage.setItem('selectedDoctor', JSON.stringify(doctorData));
            
            // Navigate to the appointment page
            window.location.href = 'appointment.html';
        });
    });
});