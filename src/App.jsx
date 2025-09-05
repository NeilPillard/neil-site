import React from 'react'
import { Mail, Phone, MapPin, Linkedin, Download, Cpu, Wrench, TrendingUp } from 'lucide-react'

const Section = ({id, title, children}) => (
  <section id={id} className="scroll-mt-20 max-w-6xl mx-auto px-6 py-20">
    <h2 className="text-3xl font-extrabold mb-8 text-center">{title}</h2>
    {children}
  </section>
)

export default function App() {
  return (
    <div className="font-sans bg-white text-gray-900 scroll-smooth">
      {/* Navigation */}
      <header className="sticky top-0 bg-white/90 backdrop-blur border-b z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold tracking-tight">Neil Jose Pillard</h1>
          <nav className="space-x-6 hidden md:flex text-sm font-medium">
            <a href="#about" className="hover:text-blue-600">About</a>
            <a href="#experience" className="hover:text-blue-600">Experience</a>
            <a href="#projects" className="hover:text-blue-600">Projects</a>
            <a href="#skills" className="hover:text-blue-600">Skills</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative text-white py-32 text-center bg-gradient-to-r from-blue-300 via-blue-400 to-indigo-400">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
        <div className="relative z-10">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">Engineer · Strategist · Innovator</h2>
          <p className="max-w-3xl mx-auto text-xl opacity-95 leading-relaxed">
            Blending engineering expertise, operational leadership, and creative vision to build impactful solutions and drive growth.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a 
              href="/RESUME_NEIL_JOSE_PILLARD.pdf" 
              download 
              className="bg-white text-blue-900 px-5 py-3 rounded-lg font-semibold flex items-center gap-2 shadow hover:bg-gray-100"
            >
              <Download className="h-5 w-5" /> Download CV
            </a>
            <a 
              href="#contact" 
              className="border border-white px-5 py-3 rounded-lg font-semibold text-white hover:bg-white/10"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about" title="About Me">
        <p className="max-w-3xl mx-auto text-center text-lg leading-relaxed">
          I am Neil, an Electrical & Electronics Engineering professional specialized in Robotics and Industrial Automation. 
          I leverage engineering expertise, digital product development, and strategic operations to help organizations innovate, 
          expand, and achieve long-term success.
        </p>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Experience">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 border rounded-xl shadow hover:shadow-md transition bg-gray-50">
            <h3 className="font-semibold text-lg mb-2">Operations & Strategy Leadership</h3>
            <p className="text-sm opacity-80">Guiding organizations to scale effectively through process optimization, cross-functional leadership, and data-driven decision-making.</p>
          </div>
          <div className="p-6 border rounded-xl shadow hover:shadow-md transition bg-gray-50">
            <h3 className="font-semibold text-lg mb-2">Digital Product Management</h3>
            <p className="text-sm opacity-80">Leading app, web, and backend projects from planning to launch, ensuring user satisfaction and business alignment.</p>
          </div>
          <div className="p-6 border rounded-xl shadow hover:shadow-md transition bg-gray-50">
            <h3 className="font-semibold text-lg mb-2">Engineering & Automation</h3>
            <p className="text-sm opacity-80">Expertise in PLC, SCADA, HMI, VFD systems, robotics, and industrial automation.</p>
          </div>
          <div className="p-6 border rounded-xl shadow hover:shadow-md transition bg-gray-50">
            <h3 className="font-semibold text-lg mb-2">Client & Vendor Engagement</h3>
            <p className="text-sm opacity-80">Building and maintaining strong relationships with stakeholders, ensuring client success and long-term vendor partnerships that drive measurable results.</p>
          </div>
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Key Engineering Projects & Innovations">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-xl shadow hover:shadow-md transition bg-gray-50">
            <h4 className="font-semibold mb-2">Precision Tech</h4>
            <p className="text-sm opacity-80">Pioneered the world’s first specialized closed-loop stepper motor system designed for precision applications. Recognized with funding and multiple awards for innovation and real-world impact.</p>
          </div>
          <div className="p-6 border rounded-xl shadow hover:shadow-md transition bg-gray-50">
            <h4 className="font-semibold mb-2">Prototype 3 DOF Robotic Arm</h4>
            <p className="text-sm opacity-80">Developed a prototype 3 DOF robotic arm integrating servo control and microcontrollers. Demonstrated advanced motion precision and manipulation capabilities, positioning it as a key step toward scalable automation solutions.</p>
          </div>
          <div className="p-6 border rounded-xl shadow hover:shadow-md transition bg-gray-50">
            <h4 className="font-semibold mb-2">Stepper Motor Driver</h4>
            <p className="text-sm opacity-80">Created a custom motor driver adaptable to a wide range of stepper motors. Designed in KiCad, it integrates surge protection and advanced driver features, ensuring reliable and flexible performance in automation systems.</p>
          </div>
          <div className="p-6 border rounded-xl shadow hover:shadow-md transition bg-gray-50">
            <h4 className="font-semibold mb-2">Closed Loop Control</h4>
            <p className="text-sm opacity-80">Engineered the world’s first Simulink-based closed-loop control system for extrusion processes. This breakthrough significantly enhanced precision, efficiency, and consistency, establishing a new benchmark in industrial automation.</p>
          </div>
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 p-4 border rounded-xl shadow-sm bg-gray-50">
            <TrendingUp className="h-5 w-5 text-blue-600"/>
            <span className="font-medium">Technical Leadership</span>
          </div>
          <div className="flex items-center gap-3 p-4 border rounded-xl shadow-sm bg-gray-50">
            <TrendingUp className="h-5 w-5 text-blue-600"/>
            <span className="font-medium">Strategic Operations</span>
          </div>
          <div className="flex items-center gap-3 p-4 border rounded-xl shadow-sm bg-gray-50">
            <Cpu className="h-5 w-5 text-blue-600"/>
            <span className="font-medium">Digital Transformation</span>
          </div>
          <div className="flex items-center gap-3 p-4 border rounded-xl shadow-sm bg-gray-50">
            <Wrench className="h-5 w-5 text-blue-600"/>
            <span className="font-medium">Product Development</span>
          </div>
          <div className="flex items-center gap-3 p-4 border rounded-xl shadow-sm bg-gray-50">
            <Cpu className="h-5 w-5 text-blue-600"/>
            <span className="font-medium">Industrial Automation</span>
          </div>
          <div className="flex items-center gap-3 p-4 border rounded-xl shadow-sm bg-gray-50">
            <Cpu className="h-5 w-5 text-blue-600"/>
            <span className="font-medium">PLC & SCADA Systems</span>
          </div>
          <div className="flex items-center gap-3 p-4 border rounded-xl shadow-sm bg-gray-50">
            <Cpu className="h-5 w-5 text-blue-600"/>
            <span className="font-medium">Robotics & Control</span>
          </div>
          <div className="flex items-center gap-3 p-4 border rounded-xl shadow-sm bg-gray-50">
            <Cpu className="h-5 w-5 text-blue-600"/>
            <span className="font-medium">Data Analysis</span>
          </div>
          <div className="flex items-center gap-3 p-4 border rounded-xl shadow-sm bg-gray-50">
            <Wrench className="h-5 w-5 text-blue-600"/>
            <span className="font-medium">Problem Solving</span>
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-lg font-medium text-center">Let's connect and collaborate</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col items-start gap-2">
              <p className="flex items-center gap-2"><Mail className="h-5 w-5"/> <a href="mailto:neil.j.pillard@gmail.com" className="underline">neil.j.pillard@gmail.com</a></p>
              <p className="flex items-center gap-2"><Linkedin className="h-5 w-5"/> <a href="https://linkedin.com/in/neilpillard" className="underline">LinkedIn</a></p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <p className="flex items-center gap-2"><Phone className="h-5 w-5"/> <a href="tel:+97433637582" className="underline">+974 3363 7582</a></p>
              <p className="flex items-center gap-2"><MapPin className="h-5 w-5"/> Doha, Qatar</p>
            </div>
          </div>
        </div>
      </Section>

      <footer className="text-center py-6 border-t mt-12 text-sm opacity-70">
  © 2025 Neil Jose Pillard
</footer>
    </div>
  )
}
