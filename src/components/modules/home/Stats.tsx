import { ArrowRight } from "lucide-react";
import { Link } from "react-router"
interface Stats8Props {
  heading?: string;
  description?: string;
  link?: {
    text: string;
    url: string;
  };
  stats?: Array<{
    id: string;
    value: string;
    label: string;
  }>;
}

const Stats = ({
  heading = "Platform performance insights",
  description = "Ensuring stability and scalability for all users",
  link = {
    text: "Read the full impact report",
    url: "/tours",
  },
  stats = [
    {
      id: "stat-1",
      value: "250%+",
      label: "average growth in user engagement",
    },
    {
      id: "stat-2",
      value: "$2.5m",
      label: "annual savings per enterprise partner",
    },
    {
      id: "stat-3",
      value: "200+",
      label: "integrations with top industry platforms",
    },
    {
      id: "stat-4",
      value: "99.9%",
      label: "customer satisfaction over the last year",
    },
  ],
}: Stats8Props) => {
  return (
    <section className="min-h-[calc(100vh-64px)] flex items-center py-6">
      <div className="container">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">{heading}</h2>
          <p className='text-xl md:text-2xl'>{description}</p>
          <Link
            to={link.url}
            className="flex items-center gap-1 font-bold  text-xl hover:underline"
          >
            {link.text}
            <ArrowRight className="h-auto w-4" />
          </Link>
        </div>
        <div className="mt-14 grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col gap-5">
              <div className="text-6xl font-bold">{stat.value}</div>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Stats };
