
import { Hero } from '@/components/modules/home/Hero';



export default function HomePage() {
  return (
    <div className="px-4  md:px-6">
      <Hero heading={'Pmp Tour Managment Solutions'} description={'Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.'} badge='An Overview' buttons={{
        primary: {
          text: "Book A Tour",
          url: "/tours"
        },
        secondary: {
          text: "View All Tour",
          url: "/tours"
        }
      }} />

    </div>
  )
}
