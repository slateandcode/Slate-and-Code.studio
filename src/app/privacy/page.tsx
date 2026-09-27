import type { Metadata } from "next";
import LegalPage, {
  LEGAL,
  Mail,
  WhoWeAre,
  type LegalSection,
} from "@/components/LegalPage";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/site";

const TITLE = "Privacy Policy";
const DESCRIPTION =
  "What personal data Slate & Code collects through its website, ads and messages, why, who it is shared with, and your rights over it.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/privacy",
});

/* Every tool named here was checked against the codebase on the date at the
   top: no analytics, no tracking scripts, no cookies, no embeds. Adding any of
   those means updating the "Automatically" and "Cookies" sections first. */
const SECTIONS: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <WhoWeAre />
        <p>
          We decide how and why the personal data described here is used, which
          makes us its controller.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    body: (
      <>
        <h3>Instagram and Facebook ads and messages</h3>
        <p>
          When you reply to one of our ads or send us a message, we collect
          your name, your Instagram handle, your answers to our questions
          (whether you need a new website or a redesign, your timeline, and
          your current website address) and the content of your messages.
        </p>

        <h3>The contact form on this website</h3>
        <p>
          Your name, email address and message, plus the budget and timeline
          if you choose them.
        </p>

        <h3>Automatically, when you visit</h3>
        <p>
          This website does not use analytics, advertising or tracking tools,
          and it does not set cookies. Our hosting provider records standard
          technical information for each visit, such as your IP address,
          browser and device type, and the pages requested. This is needed to
          deliver the site and keep it secure. When you send the contact form,
          your IP address is also used to block repeated submissions. We do not
          save it anywhere.
        </p>

        <h3>Clients</h3>
        <p>
          If you become a client, we collect what you give us to build your
          website. This can include your business and contact details, text,
          images and logos, access to accounts such as your domain or hosting,
          and the details we need to invoice you.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use it",
    body: (
      <>
        <ul>
          <li>To reply to your enquiries and messages.</li>
          <li>To prepare free website audits and quotes.</li>
          <li>To plan, build and deliver client projects.</li>
          <li>To send invoices and keep accounting records.</li>
          <li>To keep this website running, secure and improving.</li>
        </ul>
        <p>
          We do not sell or rent your personal data, and we do not use it for
          automated decisions about you.
        </p>
      </>
    ),
  },
  {
    id: "legal-basis",
    title: "Our legal basis",
    body: (
      <>
        <p>
          We handle personal data in line with the UK General Data Protection
          Regulation (UK GDPR), because we work with businesses in the UK, and
          the UAE Personal Data Protection Law (Federal Decree-Law No. 45 of
          2021). We rely on:
        </p>
        <ul>
          <li>
            <strong>Consent</strong>, when you choose to contact us and share
            your details. You can withdraw it at any time.
          </li>
          <li>
            <strong>Legitimate interests</strong>, to reply to enquiries,
            prepare audits and quotes, and keep this website secure, in ways
            you would reasonably expect.
          </li>
          <li>
            <strong>Contract</strong>, to deliver work for clients, or to take
            steps you ask for before an agreement is signed.
          </li>
          <li>
            <strong>Legal obligation</strong>, to keep invoices and accounting
            records the law requires.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "who-we-share-with",
    title: "Who we share it with",
    body: (
      <>
        <p>
          Only the service providers we need to run the business, and only
          what each one needs to do its job:
        </p>
        <ul>
          <li>
            <strong>Meta Platforms</strong> (Instagram and Facebook), for our
            ads and messages. Meta also uses data on its own platforms under
            its own privacy policy.
          </li>
          <li>
            <strong>Vercel</strong>, which hosts this website.
          </li>
          <li>
            <strong>Resend</strong>, which delivers contact form messages to
            our inbox.
          </li>
          <li>
            <strong>Porkbun</strong>, our domain provider, which forwards email
            sent to our address.
          </li>
          <li>
            <strong>Google</strong> (Gmail), where our email is stored.
          </li>
          <li>
            A private notes and project tool, where we keep track of enquiries
            and projects.
          </li>
        </ul>
        <p>
          We will also share personal data if the law requires it, for example
          with a court or public authority.
        </p>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "International transfers",
    body: (
      <p>
        We are based in the United Arab Emirates, so your data is processed
        there. It may also be processed in other countries where our providers
        operate, including the United States. Where the law requires it, these
        transfers are covered by recognised safeguards, such as standard
        contractual clauses.
      </p>
    ),
  },
  {
    id: "how-long-we-keep-it",
    title: "How long we keep it",
    body: (
      <ul>
        <li>
          Enquiries that do not become clients are deleted within 12 months.
        </li>
        <li>
          Client records are kept for as long as the project needs them, and
          after that for as long as legal and accounting requirements do.
        </li>
        <li>
          Messages you send on Instagram or Facebook are also kept by Meta
          under its own policy.
        </li>
      </ul>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>You can ask us to:</p>
        <ul>
          <li>give you a copy of the personal data we hold about you;</li>
          <li>correct anything that is wrong or incomplete;</li>
          <li>delete your data;</li>
          <li>stop using your data, where we rely on legitimate interests;</li>
          <li>
            stop using your data where we rely on your consent. Withdrawing
            consent does not affect anything we did before.
          </li>
        </ul>
        <p>
          To use any of these rights, email <Mail />. It is free, and we reply
          within 30 days. We may ask you to confirm who you are first.
        </p>
        <p>
          You can also complain to a regulator. In the UK, that is the
          Information Commissioner&rsquo;s Office (ICO) at{" "}
          <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
            ico.org.uk
          </a>
          . In the UAE, it is the UAE Data Office. We would appreciate the
          chance to put things right first, so please contact us.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: (
      <p>
        This website does not use cookies, not even essential ones, and it has
        no analytics, advertising or tracking tools. That is why there is no
        cookie banner. Sites we link to, such as Instagram, have their own
        cookies and policies. If this changes, we will update this section
        and ask for your consent where the law requires it.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        Our services are for businesses. We do not knowingly collect personal
        data from anyone under 18. If you think a child has sent us their
        details, contact us and we will delete them.
      </p>
    ),
  },
  {
    id: "changes-and-contact",
    title: "Changes and contact",
    body: (
      <>
        <p>
          We may update this policy from time to time. The date at the top
          shows when it last changed. If a change affects clients, we will tell
          them directly.
        </p>
        <p>
          Questions about this policy or your data: email <Mail /> or call{" "}
          <a href={LEGAL.phoneHref}>{LEGAL.phone}</a>.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("Privacy Policy", "/privacy")} />
      <LegalPage
        label="Privacy"
        title={
          <>
            Privacy
            <br />
            policy
          </>
        }
        intro="What we collect, why we collect it, who sees it and how to have it removed. It covers this website, our ads and messages, and the work we do for clients."
        sections={SECTIONS}
      />
    </>
  );
}
