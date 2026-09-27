import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, {
  LEGAL,
  Mail,
  WhoWeAre,
  type LegalSection,
} from "@/components/LegalPage";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/site";

const TITLE = "Terms of Use";
const DESCRIPTION =
  "The terms for using the Slate & Code website: concept work, free audits, indicative pricing, ownership, liability and governing law.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/terms",
});

const SECTIONS: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: <WhoWeAre />,
  },
  {
    id: "using-this-website",
    title: "Using this website",
    body: (
      <>
        <p>
          The content on this website is general information about our
          services. It is not professional advice, and it can change without
          notice. We work to keep it accurate, but we cannot promise it is
          always complete or up to date.
        </p>
        <p>
          Some projects in our portfolio are concepts, made to show what we can
          build. They are labelled as concepts. They are not client work unless
          we say so, and they do not suggest any link with a real business of
          the same or a similar name.
        </p>
        <p>
          We are not responsible for the content of other websites we link to.
        </p>
        <p>
          Please do not misuse this website, for example by trying to break
          into it, disrupting it, or sending spam through the contact form.
        </p>
      </>
    ),
  },
  {
    id: "free-website-audits",
    title: "Free website audits",
    body: (
      <p>
        Our free website audits are general recommendations, based on what we
        can see at the time. They do not guarantee any specific result, such as
        more traffic, better search rankings, more enquiries or more sales. It
        is up to you whether to act on them, and there is no obligation to work
        with us afterwards.
      </p>
    ),
  },
  {
    id: "pricing-and-projects",
    title: "Pricing and projects",
    body: (
      <>
        <p>
          Prices shown on this website, in our ads or in our messages are
          indicative starting prices, and they can change. A quote is not a
          contract.
        </p>
        <p>
          Every project is covered by a separate written agreement, signed
          before any work starts. It sets out the scope, price, timeline and
          payment terms. If that agreement and these terms ever disagree, the
          agreement wins.
        </p>
        <p>
          Current packages are on the{" "}
          <Link href="/services">services page</Link>.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: (
      <>
        <p>
          The content and designs on this website, including its text, visuals,
          code and the Slate &amp; Code name and logo, belong to Slate &amp;
          Code unless a client agreement says otherwise. You are welcome to
          view and share links to it. Please do not copy or reuse it without
          our written permission.
        </p>
        <p>
          Names and logos of other businesses shown on this website belong to
          their owners. Who owns the work we deliver to a client is set out in
          that client&rsquo;s agreement.
        </p>
      </>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of liability",
    body: (
      <>
        <p>
          This website is provided as it is. As far as the law allows, we are
          not liable for any loss that comes from using it or relying on its
          content, including our free audits. That includes loss of profit,
          business or data.
        </p>
        <p>
          Our responsibilities to clients are set out in their project
          agreements. Nothing in these terms limits any liability that the law
          does not allow us to limit.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of the United Arab Emirates, as
        applied in the Emirate of Dubai. Any dispute about them will be handled
        by the courts of Dubai.
      </p>
    ),
  },
  {
    id: "changes-and-contact",
    title: "Changes and contact",
    body: (
      <>
        <p>
          We may update these terms from time to time. The date at the top
          shows when they last changed, and using the website after that means
          you accept the new version.
        </p>
        <p>
          Questions about these terms: email <Mail /> or call{" "}
          <a href={LEGAL.phoneHref}>{LEGAL.phone}</a>. How we handle your
          data is covered in our <Link href="/privacy">privacy policy</Link>.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("Terms of Use", "/terms")} />
      <LegalPage
        label="Terms"
        title={
          <>
            Terms
            <br />
            of use
          </>
        }
        intro="The ground rules for using this website. By using it, you agree to them. Client projects are covered by their own written agreement."
        sections={SECTIONS}
      />
    </>
  );
}
