import { assets } from "../assets/frontend_assets/assets";

const teamMembers = [
  { name: 'Govind Upadhyay', role: 'Founder & CEO', imageUrl: assets.govind1 },
  { name: 'Govind Upadhyay', role: 'Head of Product', imageUrl: assets.govind2 },
  { name: 'Govind Upadhyay', role: 'Lead Designer', imageUrl: assets.govind3 },
];

const AboutPage = () => {
  return (
    <div>
      <main>
        {/* Our Mission */}
        <div className="mt-10 lg:mt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h1 className="text-2xl gap-2 sm:text-3xl font-semibold text-slate-500">
                  OUR
                  <span className="text-blue-950"> MISSION</span>
                </h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                To bring joy and convenience to our customers by providing exceptional products and an unparalleled shopping experience. We believe in quality, sustainability, and customer happiness above all else.
              </p>
            </div>
          </div>
        </div>
        
        {/* Why Choose Us Section */}
        <div className="mt-16 lg:mt-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Why Shop With Us?</h2>
                </div>
                <div className="mt-12 grid gap-10 md:grid-cols-3">
                    <div className="text-center">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" /></svg>
                        </div>
                        <h3 className="mt-5 text-lg font-medium text-gray-900">Ethically Sourced</h3>
                        <p className="mt-2 text-base text-gray-500">We partner with the best to ensure our products are made responsibly.</p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <h3 className="mt-5 text-lg font-medium text-gray-900">Fast Shipping</h3>
                        <p className="mt-2 text-base text-gray-500">Get your products delivered to your door in no time.</p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="mt-5 text-lg font-medium text-gray-900">Quality Guaranteed</h3>
                        <p className="mt-2 text-base text-gray-500">We stand by the quality of our products. If you're not satisfied, we'll make it right.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Team Section */}
        <div className="bg-gray-50 mt-16 lg:mt-24 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Meet Our Team</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                The passionate people behind the scenes who make everything possible.
              </p>
            </div>
            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((person) => (
                <div key={person.name} className="text-center">
                  <img className="mx-auto h-40 w-40 rounded-full object-cover" src={person.imageUrl} alt={person.name} />
                  <h3 className="mt-6 text-lg font-medium text-gray-900">{person.name}</h3>
                  <p className="text-base font-medium text-indigo-600">{person.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;