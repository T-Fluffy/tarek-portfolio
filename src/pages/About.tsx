import CanvasBackground from "../components/CanvasBackground";


const About: React.FC = () => {
  return (
    <><CanvasBackground /><div className="max-w-3xl mx-auto p-6" style={{ position: "relative", zIndex: 1 , color: "white"}}>
      <h1 className="text-3xl font-bold mb-4">About Me</h1>
      <p className="text-lg leading-relaxed mb-4">
        Hi! I'm <strong>Tarek Halloul</strong>, a dedicated software engineer and game developer with strong experience in Unity, Godot, and web technologies like React, Angular, and Spring Boot. I love building immersive game worlds and elegant web apps.
      </p>
      <p className="text-lg leading-relaxed mb-4">
        I hold a Software Engineering degree from EPI School and have worked as an instructor, intern, and developer on various real-world projects. I'm passionate about learning, teaching, and growing in both game and web development fields.
      </p>
      <p className="text-lg leading-relaxed">
        I'm currently exploring shader programming and always looking to collaborate on meaningful tech projects that create impact.
      </p>
    </div></>
  );
};

export default About;
