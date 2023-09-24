const container = document.querySelector('.container');

const generateMarkup = (courses) => {
  return courses
    .map((course) => {
      return `<section class="course">
        <h4 class="course_title">${course.course_name}</h4>
        <p>${course.instructor}</p>
        <p>${course.description}</p>
        <p>${course.duration}</p>
        <p>${course.price}</p>
      </section>`;
    })
    .join(' ');
};

const fetchCourses = () => {
  fetch('http://localhost:8000/api/course')
    .then((res) => {
      if (!res.ok) throw new Error(res.status);
      return res.json();
    })
    .then((data) => {
      let renderHtml = generateMarkup(data);
      container.innerHTML = renderHtml;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

fetchCourses();
