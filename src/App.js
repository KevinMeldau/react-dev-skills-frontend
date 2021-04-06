import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [state, setState] = useState({
    skills: [{ skill: "JavaScript", level: "4" }],
    newSkill: {
      skill: "",
      level: "3",
    },
  });

  async function getAppData() {
    try {
      const BASE_URL = 'http://localhost:3001/api/skills';
      const skills = await fetch(BASE_URL).then(res => res.json());
      setState((prevState) => ({
        ...prevState,
        skills,
      }));
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAppData();
  }, []);

  async function addSkill(e) {
    e.preventDefault();
    
    const BASE_URL = 'http://localhost:3001/api/skills';
    
    const skill = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json'
      },
      body: JSON.stringify(state.newSkill)
    }).then(res => res.json());

    setState((prevState) => ({
      skills: [...prevState.skills, skill],
      newSkill: {
        skill: "",
        level: "3",
      },
    }));
  }

  function handleChange(e) {
    setState((prevState) => ({
      ...prevState, 
      newSkill: {
        ...prevState.newSkill,
        [e.target.name]: e.target.value 
      }
    })) 
  }

  return (
    <section>
      <h2>DEV SKILLS</h2>
      <hr />
      {state.skills.map((s) => (
        <article key={s.skill}>
          <div>{s.skill}</div> <div>{s.level}</div>
        </article>
      ))}
      <hr />
      <form onSubmit={addSkill}>
        <label>
          <span>SKILL</span>
          <input name="skill" value={state.newSkill.skill} onChange={handleChange} />
        </label>
        <label>
          <span>LEVEL</span>
          <select name="level" value={state.newSkill.level} onChange={handleChange} >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <button>ADD SKILL</button>
      </form>
    </section>
  );
}