// src/pages/About.jsx

import { Card, Button, Collapse } from "antd";

const { Panel } = Collapse;

 function About() {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-10">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          About{" "}
          <span className="text-blue-600">Our Marketplace</span>
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          This website is an auction platform where anyone can upload their
          product and other users can place bids on it. The seller has the
          choice to <span className="font-semibold">accept</span> or{" "}
          <span className="font-semibold">reject</span> any bid. Our main
          purpose is to provide a safe and easy bidding experience for
          everyone.
        </p>
        {/* <div className="mt-6 flex justify-center gap-4">
          <Button type="primary" className="px-6 rounded-lg">
            Start Bidding
          </Button>
          <Button className="px-6 rounded-lg border-gray-400">
            List a Product
          </Button>
        </div> */}
      </section>

      {/* How it Works */}
      <section className="max-w-6xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-6">How it Works</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="text-center shadow-sm">
            <h3 className="text-lg font-medium mb-2">Upload Product</h3>
            <p className="text-gray-600 text-sm">
              Add your product with details and pictures.
            </p>
          </Card>
          <Card className="text-center shadow-sm">
            <h3 className="text-lg font-medium mb-2">Live Bidding</h3>
            <p className="text-gray-600 text-sm">
              Users place bids in real-time, and you can see them instantly.
            </p>
          </Card>
          <Card className="text-center shadow-sm">
            <h3 className="text-lg font-medium mb-2">Accept / Reject</h3>
            <p className="text-gray-600 text-sm">
              The seller decides which bid to accept or reject.
            </p>
          </Card>
          <Card className="text-center shadow-sm">
            <h3 className="text-lg font-medium mb-2">Secure Platform</h3>
            <p className="text-gray-600 text-sm">
              A safe and transparent bidding system is provided.
            </p>
          </Card>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-6">FAQs</h2>
        <Collapse accordion>
          <Panel header="Is there any fee for listing?" key="1">
            <p className="text-gray-700">
              Currently, listing products is free. If there are any charges in
              the future, they will be clearly mentioned.
            </p>
          </Panel>
          <Panel header="Can I reject a bid?" key="2">
            <p className="text-gray-700">
              Yes, sellers can accept or reject any bid as per their choice.
            </p>
          </Panel>
          <Panel header="How does payment work?" key="3">
            <p className="text-gray-700">
              Payments are decided directly between the buyer and the seller.
              The platform only connects users and does not handle payments.
            </p>
          </Panel>
        </Collapse>
      </section>

      {/* Call to Action */}
      <section className="max-w-6xl mx-auto mt-16">
        <Card className="flex flex-col sm:flex-row items-center justify-between p-6 shadow-sm">
          <div>
            <h3 className="text-xl font-semibold">Ready to get started?</h3>
            <p className="text-gray-600 text-sm">
              List your product today or start bidding to get the best deals.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-3">
            <Button type="primary" className="rounded-lg">
              Create Listing
            </Button>
            <Button className="rounded-lg border-gray-400">
              Explore Bids
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
export default About;
