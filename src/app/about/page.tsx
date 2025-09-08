
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
    {
        question: "What is the purpose of this groundwater replenishment application?",
        answer: "The application helps individuals and communities assess their rainwater harvesting potential, receive scientifically backed recommendations for artificial recharge structures, and understand the economic benefits of implementing these measures. It empowers users to actively contribute to groundwater conservation and sustainable water management."
    },
    {
        question: "Who can use this application?",
        answer: "It is designed for urban homeowners, small-scale farmers, and community or urban planners. Each user group receives tailored insights to address their specific water conservation needs and challenges."
    },
    {
        question: "How does the application calculate rainwater harvesting potential?",
        answer: "The app uses your location, property details (like rooftop size and surface type), and local rainfall data to calculate the volume of rainwater that can be harvested accurately using standard hydrological formulas."
    },
    {
        question: "What kind of recommendations does the app provide?",
        answer: "It recommends suitable artificial recharge structures such as recharge pits, trenches, or shafts based on local hydrogeological data, catchment size, and water table conditions to ensure technical feasibility and effectiveness."
    },
    {
        question: "Does the app provide cost information?",
        answer: "Yes, it offers transparent techno-economic analysis, estimating installation costs, savings on water and energy bills, and calculating the expected payback period to support investment decisions."
    },
    {
        question: "How is this application aligned with government water conservation initiatives?",
        answer: "The app supports national missions like Jal Shakti Abhiyan and Atal Bhujal Yojana by bridging the gap between complex national datasets and local action. It serves as a digital tool for community-led sustainable groundwater management."
    },
    {
        question: "Can the application help with flood mitigation?",
        answer: "Yes, widespread rainwater harvesting and groundwater recharge reduce urban runoff and mitigate localized flooding, contributing to climate resilience."
    },
    {
        question: "Is my data secure and private?",
        answer: "The application only uses location-specific data and inputs provided by users for analysis. Privacy measures ensure that user data is protected and used solely for generating personalized recommendations."
    },
    {
        question: "What kind of output can I expect from using the app?",
        answer: "Users receive a personalized Replenishment Report detailing local water context, harvesting potential, recommended recharge solutions, financial analysis, and environmental impact, along with an interactive dashboard for ongoing monitoring."
    }
];


export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <div className="space-y-12">
        <div>
            <h2 className="text-3xl font-bold font-headline mb-6 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full mb-12">
                {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index + 1}`} key={index}>
                        <AccordionTrigger className="text-lg text-left hover:no-underline">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-muted-foreground">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
            
            <h2 className="text-3xl font-bold font-headline mb-6 text-center">About AquaRecharge</h2>
            <div className="prose max-w-none text-muted-foreground text-lg">
                <p>
                This website hosts a comprehensive groundwater replenishment application designed to address India&apos;s critical groundwater depletion crisis. Leveraging publicly available scientific data from agencies like the Central Ground Water Board and the India Meteorological Department, the application democratizes access to complex hydrological and meteorological data.
                </p>
                <p>
                Our goal is to support India&apos;s flagship water conservation missions, such as Jal Shakti Abhiyan and Atal Bhujal Yojana, by transforming national data into personalized, actionable intelligence. Users receive tailored insights into their local water context, harvesting potential, and cost-effective implementation strategies, fostering a culture of water stewardship that promotes water security, climate resilience, and economic benefits across urban and rural communities.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
