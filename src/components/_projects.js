cravenScrum.projects = (function (cs) {
  "use strict";

  var cal = cs.calendar;

  cs.getSprints = function () {
    cs.getJSON("data/project1.json",
      function (err, data) {
        if (err !== null) {
          console.log("Something went wrong: " + err);

        } else {

          data.forEach(mapProjects);

        }
      });
  };

  function mapProjects(project) {
    var sprintStart;
    var sprintEnd;
    var demoDate;
    var thisDay;
    var sprintElement;

    project.iterations.forEach(function (sprint) {
      sprintStart = new Date(sprint.startDate);
      sprintEnd = new Date(sprint.endDate);
      demoDate = new Date(sprint.demoDate);

      // Add Sprint to days
      cal.days.forEach(function (day) {

        if (day.getAttribute("date")) {
          thisDay = new Date(day.getAttribute("date"));

          if (thisDay >= sprintStart && thisDay <= sprintEnd) {

            sprintElement = day.querySelectorAll("p")[0];
            sprintElement.innerText = sprint.title;

          } else if (thisDay.getTime() === demoDate.getTime()) {

            cs.addClass(day, "holiday");

            sprintElement = day.querySelectorAll("p")[0];
            sprintElement.innerText = "Demo";

          }
        }

      });
    });
  }

  // Add sprints to calendar
  cs.getSprints();

  return cs;

} (cravenScrum || {}));