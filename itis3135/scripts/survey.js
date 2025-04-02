prefilledCourses = [
    "MATH 1242 - Calculus 2: Required course for computer science unfortunately",
    "ITCS 3160 - Database Design & Implementation: This is also a required course but because I was asked a SQL question in an interview I believe this course will be quite useful!",
    "ITSC 3146 - Intro to operating systems & Networking: Learning the basics of how the operating system does its magic alongside how the internet works is an essential fundamental of computer science.",
    "ITSC 2175 - Logic & Algorithms: Required course seems not so interesting if I am being honest but maybe in the grand scheme of things it's useful.",
    "ITIS 3135 - Web-Based-Application Design & Development: I am taking this course because I am looking forward to adding another project on my resume"
];


document.getElementById('form').addEventListener("submit", function(event) {
    event.preventDefault();
    
    const inputs = document.querySelectorAll('#form input[type="text"], #form input[type="file"]');
    let isValid = true;

    inputs.forEach((input) => {
        if (input.type === "text" && input.value.trim() === "") {
            isValid = false;
            input.style.border = "2px solid red";
        }  else if (input.type === "file" && input.files.length === 0) {
            input.style.border = "";
            isValid = true;
        } else {
            input.style.border = "";
        }
        
    });

    if (!document.getElementById('agreement').checked) {
        isValid = false;
        alert("You must agree to the terms.");
    }

    if (!isValid) {
        alert("Form Submission Prevented: Do Not Leave Fields Empty");
        return;
    }

    // Gather form data
    let formData = new FormData(document.getElementById('form'));
    const name = formData.get("name");
    
    const mascot = formData.get("mascot");

    let resultHTML = `<h3>${name} || ${mascot}</h3>`;
    

    // Image handling
    const image = document.getElementById("file").files[0];
    const imageUrl = image ? URL.createObjectURL(image) : "images/test2.jpg"; // default image if no upload
    const imageAlt = formData.get("img-caption");

    resultHTML += `<figure 
    style="img {
				width: 25%;
				height: 25%;
				clip-path: circle(45%);
				display: inline-block;
				margin: 0 auto;
			}">
            <img src="${imageUrl}" alt="${imageAlt}">
    <figcaption><em>${formData.get("img-caption")}</em></figcaption></figure>`;

    resultHTML += `<ul>`;
    resultHTML += `<li><strong>Personal background:</strong> ${formData.get("personal-background")}</li>`;
    resultHTML += `<li><strong>Professional background:</strong> ${formData.get("professional-background")}</li>`;
    resultHTML += `<li><strong>Academic background:</strong> ${formData.get("academic-background")}</li>`;
    resultHTML += `<li><strong>Background in this subject:</strong> ${formData.get("background-web")}</li>`;
    resultHTML += `<li><strong>Primary Computer Platform:</strong> ${formData.get("comp-platform")}</li>`;

    // Courses handling
    const courses = formData.getAll("course[]");
    if (courses.length > 0) {
        resultHTML += `<li><b>Courses I'm Taking &amp; Why:</b><br><ul>`;
        courses.forEach((course) => {
            resultHTML += `<li><b>${course}</b></li>`;
        });
        resultHTML += `</ul></li>`;
    } else {
        resultHTML += `<li><strong>Courses I'm Taking & Why:</strong> None</li>`;
    }

    // Funny or interesting item
    const funnyThing = (formData.get("funny-thing") || "").trim();
    if (funnyThing) {
        resultHTML += `<li><strong>Funny/Interesting item about yourself:</strong> ${funnyThing}</li>`;
    }

    // Anything else the user wants to share
    const anythingElse = (formData.get("anything-else") || "").trim();
    if (anythingElse) {
        resultHTML += `<li><strong>I'd also like to share:</strong> ${anythingElse}</li>`;
    }

    resultHTML += `</ul><a href='javascript:location.reload()'>Reset</a>`;
    
    document.querySelector('main').innerHTML = resultHTML;
});



const resetForm = () => {
    document.getElementById('form').reset();
    console.log("Form has been reset");
};

const addCourse = (courseName = '') => {
    let coursesDiv = document.getElementById("courses-div");

    document.getElementById('hidden-div').style.display = "block";

    // Make the div visible when a course is added
    coursesDiv.style.display = "block"; 


    
    let courseContainer = document.createElement("div");
    courseContainer.classList.add("course-entry");

    Object.assign(courseContainer.style, {
        display: "grid",
        gridTemplateColumns: "150px 1fr",
        gap: "30px 20px",
        alignItems: "center",
        maxWidth: "500px",
        margin: "0 auto",
        padding: "10px"
    });

    let input = document.createElement("input");
    input.type = "text";
    input.name = "course[]";
    input.placeholder = "Enter Course Name";
    input.value = courseName;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.type = "button";
    deleteBtn.onclick = function() {
        courseContainer.remove();

        
        if (coursesDiv.children.length === 0) {
            coursesDiv.style.display = "none";
            document.getElementById('hidden-div').style.display = "none";
        }
    };

    courseContainer.appendChild(input);
    courseContainer.appendChild(deleteBtn);

    coursesDiv.appendChild(courseContainer);
};

document.addEventListener("DOMContentLoaded", function () {
    prefilledCourses.forEach((course) => addCourse(course));
});