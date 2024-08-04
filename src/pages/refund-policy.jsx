import React from "react";
import Layout from "../components/landing-page/layout";

const RefundPolicy = () => {
  return (
    <Layout>
        <section className="text-[black] font-font-primary flex flex-col items-center py-24 md:mt-0 px-6 gap-10 md:items-start text-left md:px-32 md:gap-4">
        <div className="font-allotrix-font-secondary w-full text-center mt-16 md:mt-0">
            <h1 className="font-bold text-3xl md:text-4xl md:mb-10 px-2">
            Refund Policy
            </h1>
        </div>
        <div className="md:w-[750px] mx-auto font-allotrix-font-secondary flex flex-col gap-6">
            <h3 className="text-xl font-bold">Introduction</h3>
            <p>
            Welcome to Dreamclerk! This Refund Policy ("Policy") outlines our
            practices regarding refunds for services provided through the
            Dreamclerk website (the "Site") and associated services ("Services").
            Please read this Policy carefully before using our Services.
            </p>
            <ol className="flex flex-col gap-4 list-decimal pl-4">
            <li>
                <h3 className="font-bold">Scope</h3>
                <p>
                This Policy applies to all users of Dreamclerk who purchase
                services or products through the Site. By using the Services, you
                agree to be bound by this Policy.
                </p>
            </li>
            <li>
                <h3 className="font-bold">Refund Eligibility</h3>
                <p>
                Services Eligible for Refund: Refunds may be considered for
                services purchased through Dreamclerk if the service does not meet
                the specifications as described or agreed upon, or if there is a
                technical issue that prevents the proper use of the service.
                </p>
                <p>
                Non-Refundable Services: Certain services or products may be
                non-refundable. This includes services that have been completed or
                partially completed by the service provider as per the agreement.
                </p>
            </li>
            <li>
                <h3 className="font-bold">Requesting a Refund</h3>
                <p>
                Deadline: You must request a refund within 15 days from the date
                of purchase or completion of the service, whichever is later.
                </p>
                <p>
                Contact: To request a refund, you must contact Dreamclerk's
                customer support team at <a>support@dreamclerk.com.</a>
                </p>
            </li>

            <li>
                <h3 className="font-bold">
                Information Needed: Your refund request must include the following
                information:
                </h3>
                <ol>
                <li>Your name and contact information.</li>
                <li>Order number and details of the service purchased.</li>
                <li>
                    Reason for requesting a refund, with any supporting
                    documentation or evidence.
                </li>
                </ol>
            </li>
            <li>
                <h3 className="font-bold">Refund Process</h3>

                <ul>
                <li>
                    {" "}
                    Evaluation: Once we receive your refund request, we will
                    evaluate it based on the eligibility criteria.
                </li>
                <li>
                    {" "}
                    Notification: We will notify you of the approval or rejection of
                    your refund request via email.
                </li>
                <li>
                    {" "}
                    If approved, the refund will be processed using the original
                    payment method used for the purchase within 14 days.
                </li>
                </ul>
            </li>

            <li>
                <h3 className="font-bold">Exceptions</h3>
                <ul>
                <li>
                    No-shows: Refunds will not be provided for services where you
                    fail to show up at the agreed-upon time or place without
                    notifying Dreamclerk or the service provider.
                </li>
                <li>
                    Change of Mind: Refunds will not be granted for services
                    purchased but subsequently not needed or desired due to a change
                    of mind.
                </li>
                </ul>
            </li>
            <li>
                <h3 className="font-bold"> Contact Us</h3>
                <ul>
                <li>
                    Questions: If you have any questions about this Refund Policy,
                    please contact us at <a>info@dreamclerk.com.</a>
                </li>
                </ul>
            </li>
            </ol>

            <p>
            This 15-Day Refund Policy ensures that you have adequate time to
            evaluate services purchased through Dreamclerk and request a refund if
            they do not meet your expectations or if technical issues prevent
            their proper use.
            </p>
        </div>
        </section>
    </Layout>
  );
};

export default RefundPolicy;
