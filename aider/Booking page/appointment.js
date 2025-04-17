document.addEventListener('DOMContentLoaded', function() {
    // Calendar state
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let selectedDateElement = null;
    let selectedDate = null;
    
    // DOM elements
    const calendarHeader = document.querySelector('.calendar-header h3');
    const prevMonthBtn = document.querySelector('.calendar-header button:first-child');
    const nextMonthBtn = document.querySelector('.calendar-header button:last-child');
    const calendarGrid = document.querySelector('.calendar-grid');
    const bookButton = document.querySelector('.book-appointment-btn');
    
    // Initialize calendar
    renderCalendar(currentMonth, currentYear);
    
    // Disable book button initially
    bookButton.disabled = true;
    bookButton.style.opacity = "0.5";
    bookButton.style.cursor = "not-allowed";
    
    // Event listeners for navigation buttons
    prevMonthBtn.addEventListener('click', function() {
        // Prevent navigating to past months
        const now = new Date();
        if (currentYear < now.getFullYear() || 
           (currentYear === now.getFullYear() && currentMonth <= now.getMonth())) {
            // Don't allow going before current month
            return;
        }
        
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });
    
    nextMonthBtn.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });
    
    // Book appointment button event listener
    bookButton.addEventListener('click', function() {
        if (selectedDate) {
            // Create URL with date parameters
            const monthNames = ["January", "February", "March", "April", "May", "June",
                          "July", "August", "September", "October", "November", "December"];
            
            const formattedDay = selectedDate.getDate();
            const formattedMonth = monthNames[selectedDate.getMonth()];
            const formattedYear = selectedDate.getFullYear();
            const timeSlot = document.querySelector('.availability').textContent.split('|')[1].trim();
            
            // Encode parameters for URL
            const params = new URLSearchParams({
                date: `${formattedDay}`,
                month: `${formattedMonth}`,
                year: `${formattedYear}`,
                time: timeSlot,
                doctor: "Dr Fred Hutchinson"
            });
            
            // Redirect to booking completion page
            window.location.href = `booking-confirmation.html?${params.toString()}`;
        }
    });
    
    // Function to render calendar
    function renderCalendar(month, year) {
        // Update header
        const monthNames = ["January", "February", "March", "April", "May", "June",
                          "July", "August", "September", "October", "November", "December"];
        calendarHeader.textContent = `${monthNames[month]} ${year}`;
        
        // Clear existing calendar days (except weekday headers)
        const dayElements = document.querySelectorAll('.calendar-grid > div:not(:nth-child(-n+7))');
        dayElements.forEach(day => day.remove());
        
        // Get first day of month and total days in month
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Current date for comparison
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Add empty cells for days before the first day of month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            // Create a date object for this calendar day
            const calendarDate = new Date(year, month, day);
            calendarDate.setHours(0, 0, 0, 0);
            
            // Check if this day is in the past
            if (calendarDate < today) {
                dayElement.classList.add('past-date');
                dayElement.style.color = "#ccc";
                dayElement.style.cursor = "not-allowed";
            } else {
                // Add click event for date selection (only for non-past dates)
                dayElement.addEventListener('click', function() {
                    // Remove selected class from previous selection
                    if (selectedDateElement) {
                        selectedDateElement.classList.remove('selected-date');
                    }
                    
                    // Add selected class to clicked date
                    this.classList.add('selected-date');
                    selectedDateElement = this;
                    
                    // Store the selected date
                    selectedDate = new Date(year, month, day);
                    
                    // Update availability text
                    updateAvailability(day, month, year);
                    
                    // Enable book button
                    bookButton.disabled = false;
                    bookButton.style.opacity = "1";
                    bookButton.style.cursor = "pointer";
                });
            }
            
            // Check if this day is today
            if (calendarDate.getTime() === today.getTime()) {
                dayElement.classList.add('today');
            }
            
            calendarGrid.appendChild(dayElement);
        }
    }
    
    // Function to update availability text
    function updateAvailability(day, month, year) {
        const availabilityDiv = document.querySelector('.availability');
        const monthNames = ["January", "February", "March", "April", "May", "June",
                          "July", "August", "September", "October", "November", "December"];
        
        // Example time slots - in a real app, these would come from a database
        const timeSlots = ["10:00 - 12:00", "14:00 - 16:00", "16:30 - 18:00"];
        const randomTimeSlot = timeSlots[Math.floor(Math.random() * timeSlots.length)];
        
        availabilityDiv.innerHTML = `Earliest Availability: ${monthNames[month]} ${day}, ${year} | ${randomTimeSlot}`;
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // Get the selected doctor's data from localStorage
    const doctorData = JSON.parse(localStorage.getItem('selectedDoctor'));
    
    // If no doctor was selected, return to the main page
    if (!doctorData) {
        window.location.href = 'index.html';
        return;
    }
    
    // Update the doctor's information on the page
    const doctorPhoto = document.querySelector('.doctor-photo');
    const doctorName = document.querySelector('.doctor-details h1');
    const doctorSpecialty = document.querySelector('.doctor-details p:first-of-type');
    const doctorBio = document.querySelector('.doctor-details p:last-of-type');
    const experienceStat = document.querySelector('.medical-stats .stat:first-child .stat-value');
    const patientsStat = document.querySelector('.medical-stats .stat:last-child .stat-value');
    
    // Update the elements with the doctor's data
    if (doctorPhoto) doctorPhoto.src = doctorData.image;
    if (doctorName) doctorName.textContent = doctorData.name;
    
    // Extract specialty from doctorData
    const specialty = doctorData.specialty;
    
    // Extract years from experience (e.g., "5 years" -> "5+")
    const yearsMatch = doctorData.experience.match(/\d+/);
    const years = yearsMatch ? yearsMatch[0] : "5";
    
    if (doctorSpecialty) {
        // Format: "MD, MBBS - Specialty"
        doctorSpecialty.textContent = `MD, MBBS - ${specialty}`;
    }
    
    if (doctorBio) doctorBio.textContent = doctorData.bio;
    if (experienceStat) experienceStat.textContent = `${years}+`;
    if (patientsStat) patientsStat.textContent = doctorData.patients;
    
    // Set page title
    document.title = `${doctorData.name} - ${specialty} Appointment`;
    
    // Add event listener to the book appointment button
    const bookButton = document.querySelector('.book-appointment-btn');
    if (bookButton) {
        bookButton.addEventListener('click', function() {
            // Get the selected date from the calendar
            const selectedDateElement = document.querySelector('.selected-date');
            const date = selectedDateElement ? selectedDateElement.textContent : '15';
            
            // Get the month and year from the calendar header
            const calendarHeader = document.querySelector('.calendar-header h3').textContent;
            const [month, year] = calendarHeader.split(' ');
            
            // Get the availability time (you might want to make this selectable in a real app)
            const availabilityText = document.querySelector('.availability').textContent;
            const timeMatch = availabilityText.match(/(\d+:\d+\s*-\s*\d+:\d+)/);
            const time = timeMatch ? timeMatch[1] : '10:00 - 12:00';
            
            // Construct URL parameters for the confirmation page
            const params = new URLSearchParams();
            params.append('doctor', doctorData.name);
            params.append('specialty', specialty);
            params.append('date', date);
            params.append('month', month);
            params.append('year', year);
            params.append('time', time);
            
            // Navigate to the confirmation page with the parameters
            window.location.href = `booking-confirmation.html?${params.toString()}`;
        });
    }
});