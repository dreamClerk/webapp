import React from "react";
import Layout from "../components/landing-page/layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
        <section className="text-[black] font-font-primary flex flex-col items-center py-24 md:mt-0 px-6 gap-10 md:items-start text-left md:px-32 md:gap-4">
        <div className="w-full text-center md:mt-0">
            <h1 className="font-bold text-3xl md:text-4xl md:mb-10 px-2">
            Privacy Policy
            </h1>
        </div>
        <div className="md:w-[750px] mx-auto flex flex-col gap-6">
            <p>
            Welcome to Dreamclerk. We are committed to protecting your personal
            information and your right to privacy. If you have any questions or
            concerns about this privacy notice, or our practices with regards to
            your personal information, please contact us at
            support@dreamclerk.com.
            </p>
            <p>
            When you visit our website{" "}
            <a href="www.dreamclerk.com">www.dreamclerk.com</a> (the "Website"),
            and more generally, use any of our services (the "Services," which
            include the Website), we appreciate that you are trusting us with your
            personal information. We take your privacy very seriously. In this
            privacy notice, we seek to explain to you in the clearest way possible
            what information we collect, how we use it, and what rights you have
            in relation to it. We hope you take some time to read through it
            carefully, as it is important. If there are any terms in this privacy
            policy that you do not agree with, please discontinue use of our
            Services immediately.
            </p>
            <ol className="flex flex-col gap-4 list-decimal pl-4">
            <li>
                <strong>What Information Do We Collect?</strong>
                <ul className="list-disc">
                <li className="ml-4">
                    We collect personal information that you voluntarily provide to
                    us when you register on the Website, express an interest in
                    obtaining information about us or our products and Services,
                    when you participate in activities on the Website, or otherwise
                    when you contact us. The personal information that we collect
                    depends on the context of your interactions with us and the
                    Website, the choices you make, and the products and features you
                    use. The personal information we collect may include the
                    following:{" "}
                    <ul className="list-disc ml-6">
                    <li>
                        Personal Information: Full name, email address, and other
                        similar information. .
                    </li>
                    <li>
                        Documents: Identity proof documents and payment screenshots.
                    </li>
                    <li>
                        Preferences: Registration preferences and profile pictures.
                    </li>
                    </ul>
                </li>
                </ul>
            </li>
            <li>
                <strong>How Do We Use Your Information?</strong>
                <ul className="list-disc">
                <li className="ml-4">
                    We use personal information collected via our Website for a
                    variety of business purposes described below:
                    <ul className="list-disc ml-6">
                    <li>
                        To facilitate account creation and the logon process..
                    </li>
                    <li>
                        To send administrative information to you, sales emails, and
                        updates. You may opt-out of receiving these communications
                        from us by clicking on the unsubscribe link or following the
                        instructions provided in any email we send.
                    </li>
                    <li>
                        To enforce our terms, conditions, and policies for business
                        purposes, to comply with legal and regulatory requirements,
                        or in connection with our contract.
                    </li>
                    <li>To respond to legal requests and prevent harm.</li>
                    </ul>
                </li>
                </ul>
            </li>
            <li>
                <strong>Will Your Information Be Shared With Anyone?</strong>
                <ul className="list-disc">
                <li className="ml-4">
                    We do not share your personal information with third parties,
                    partners, or affiliates. Your information is used solely for the
                    purposes outlined in this policy and within our organization to
                    help improve our Services.
                </li>
                </ul>
            </li>
            <li>
                <strong>How Long Do We Keep Your Information?</strong>
                <ul className="list-disc">
                <li className="ml-4">
                    We will keep your personal information for as long as it is
                    necessary for the purposes set out in this privacy policy,
                    unless a longer retention period is required or permitted by law
                    (such as tax, accounting, or other legal requirements).
                </li>
                </ul>
            </li>
            <li>
                <strong>How Do We Keep Your Information Safe?</strong>
                <ul className="list-disc">
                <li className="ml-4">
                    We aim to protect your personal information through a system of
                    organizational and technical security measures. We have
                    implemented appropriate technical and organizational security
                    measures designed to protect the security of any personal
                    information we process. However, despite our safeguards and
                    efforts to secure your information, no electronic transmission
                    over the Internet or information storage technology can be
                    guaranteed to be 100% secure, so we cannot promise or guarantee
                    that hackers, cybercriminals, or other unauthorized third
                    parties will not be able to defeat our security and improperly
                    collect, access, steal, or modify your information.
                </li>
                </ul>
            </li>
            <li>
                <strong>Do We Collect Information From Minors?</strong>
                <ul className="list-disc">
                <li className="ml-4">
                    We do not knowingly collect data from or market to children
                    under 13 years of age. Our website is designed to be child-safe
                    and does not display content that could be harmful to minors.
                </li>
                </ul>
            </li>
            <li>
                <strong>What Are Your Privacy Rights?</strong>
                <ul className="list-disc">
                <li className="ml-4">
                    In some regions, such as the European Economic Area, you have
                    rights that allow you greater access to and control over your
                    personal information. You may review, change, or terminate your
                    account at any time.
                </li>
                <li className="ml-4">
                    If you have questions or comments about your privacy rights, you
                    may email us at{" "}
                    <a
                    href="mailto:support@dreamclerk.com.
    "
                    className="text-blue-500"
                    >
                    support@dreamclerk.com.
                    </a>
                    .
                </li>
                </ul>
            </li>
            <li>
                <strong>Controls for Do-Not-Track Features</strong>
                <ul className="list-disc">
                <li className="ml-4">
                    n some regions, such as the European Economic Area, you have
                    rights that allow you greater access to and control over your
                    personal information. You may review, change, or terminate your
                    account at any time. If you have questions or comments about
                    your privacy rights, you may email us at support@dreamclerk.com.
                </li>
                </ul>
            </li>
            </ol>
            <p>
            Most web browsers and some mobile operating systems and mobile
            applications include a Do-Not-Track (“DNT”) feature or setting you can
            activate to signal your privacy preference not to have data about your
            online browsing.
            </p>
        </div>
        </section>
    </Layout>
  );
};

export default PrivacyPolicy;
