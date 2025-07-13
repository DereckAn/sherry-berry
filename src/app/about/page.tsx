import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-black mb-6">
            About
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Profile Image */}
          <div className="lg:order-2">
            <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
              {/* TODO: Replace with actual profile image */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Profile Photo
              </div>
            </div>
          </div>

          {/* Bio Content */}
          <div className="lg:order-1 space-y-6">
            <div>
              <h2 className="text-2xl font-light tracking-tight text-black mb-4">
                Film & Television Set Designer
              </h2>
              <p className="text-gray-600 leading-relaxed">
                With over a decade of experience in the entertainment industry, I specialize in 
                creating immersive environments that serve the story while captivating audiences. 
                My work spans feature films, television series, commercials, and theater productions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-black mb-3">Experience</h3>
              <p className="text-gray-600 leading-relaxed">
                I've had the privilege of working with renowned directors and production companies 
                on projects ranging from intimate character studies to large-scale blockbusters. 
                My approach combines artistic vision with practical problem-solving, ensuring that 
                every set serves both the creative and logistical needs of the production.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-black mb-3">Philosophy</h3>
              <p className="text-gray-600 leading-relaxed">
                I believe that great set design is invisible to the audience – it should feel so 
                natural and authentic that viewers are completely immersed in the world of the story. 
                Every detail, from the grandest architectural element to the smallest prop, should 
                contribute to the narrative and character development.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-black mb-3">Recognition</h3>
              <div className="space-y-2 text-gray-600">
                <p>• Emmy Award Nominee - Outstanding Production Design</p>
                <p>• Art Directors Guild Award Winner</p>
                <p>• BAFTA Film Award Nominee</p>
                <p>• Critics Choice Award Winner</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills & Expertise */}
        <div className="mt-20">
          <h2 className="text-2xl font-light tracking-tight text-black mb-8 text-center">
            Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="font-medium text-black mb-3">Pre-Production</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>Script Analysis</li>
                <li>Concept Development</li>
                <li>Research & Reference</li>
                <li>Budget Planning</li>
                <li>Location Scouting</li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="font-medium text-black mb-3">Design & Planning</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>Set Design</li>
                <li>Technical Drawings</li>
                <li>3D Visualization</li>
                <li>Color Palettes</li>
                <li>Material Selection</li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="font-medium text-black mb-3">Production</h3>
              <ul className="space-y-1 text-gray-600 text-sm">
                <li>Set Construction</li>
                <li>Art Direction</li>
                <li>Prop Coordination</li>
                <li>Set Decoration</li>
                <li>On-Set Support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}