function registerForCourse(course) {
    let enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    if (!enrolledCourses.includes(course)) {
        enrolledCourses.push(course);
        localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
        alert('Вы успешно записались на курс!');
    } else {
        alert('Вы уже записаны на этот курс!');
    }
}