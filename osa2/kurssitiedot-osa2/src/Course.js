const Header = ({ text }) => <h1>{text}</h1>
    
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part => {
          return (
            <Part key={(course.id, part.id)} name={part.name} exercises={part.exercises} />
          )
        })}
      </div>
    )
  }
  
  const Part = ({ name, exercises }) => <p>{name} {exercises}</p>
     
  
  const Total = ({ parts }) => {
    const total = parts.reduce((total, part) => total + part.exercises, 0 )
    return (
      <b>total of {total} exercises</b>
    )
  }
  
  const Course = ({ courses }) => {
    return (
      <div>
        {courses.map(course => {
          return (
            <div key={course.id}>
            <Header text={course.name} />
            <Content course={course}/>
            <Total parts={course.parts} />
            </div>
          )
        })}
      </div>
    )
  }
  
  export default Course  