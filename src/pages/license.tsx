// eslint-disable react/no-unescaped-entities
import { Link, PageProps } from 'gatsby';
import * as React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import TopNavigationBar from '../components/TopNavigationBar/TopNavigationBar';

export default function LicensePage(props: PageProps) {
  return (
    <Layout>
      <SEO title="License and Usage" image={null} pathname={props.path} />

      <TopNavigationBar />

      <div
        data-page-tone="dark"
        className="min-h-screen"
        style={{ background: 'linear-gradient(to bottom, #120F24 0%, #0E0B1F 48%, #0A0818 100%)' }}
      >
      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <h1 className="mt-8 text-4xl font-extrabold text-[#F4EDEA]">License and Usage</h1>

        <div className="mt-6 text-lg text-[rgba(244,237,234,0.80)]">
          <p className="mb-4">
            No part of this site may be used, reproduced, redistributed,
            commercialized, or sold without prior written permission, except as
            permitted under the{' '}
            <a
              rel="license noreferrer"
              className={
                'text-[#F0C2FF] hover:text-[#F4EDEA] hover:underline'
              }
              href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
              target={'_blank'}
            >
              Creative Commons Attribution-NonCommercial-ShareAlike 4.0
              International License
            </a>
            .
          </p>
          <p className="mb-2">
            "This site" includes, but is not limited to, the following:
          </p>
          <ul className="mb-4 list-disc pl-10">
            <li>The format, layout, design, and features of the website</li>
            <li>The contents of the Guide</li>
            <li>
              The structure and organization of topics listed in the guide
            </li>
            <li>Text content of each module</li>
            <li>Problems and links listed in each module</li>
          </ul>

          <p className="mb-2">
            Note: We provide examples below as a general summary of, but not a
            substitute for,{' '}
            <a
              rel="license noreferrer"
              className={
                'text-[#F0C2FF] hover:text-[#F4EDEA] hover:underline'
              }
              href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
              target={'_blank'}
            >
              our license
            </a>
            .
          </p>
          <p className="mb-2">
            Examples of PERMITTED use cases that do not require prior written
            permission include, but are not limited to, the following:
          </p>
          <ul className="mb-4 list-disc pl-10">
            <li>Using these resources as an individual to improve</li>
            <li>Sharing a link to these resources</li>
            <li>
              Using these resources as part of a FREE class/school club (if you
              give credit where credit is due and provide a link to this site)
              <ul className="list-disc pl-10">
                <li>
                  If you're offering free classes/are running a school club and
                  would like specific resources, feel free to reach out to our Founder Pranav Ramesh (email below) and we will try our best
                  to help!
                </li>
              </ul>
            </li>
            <li>
              Writing FREELY AVAILABLE and OPEN SOURCE follow-up material
              <ul className="list-disc pl-10">
                <li>
                  If you would like to contribute to this guide, please reach
                  out to our Founder Pranav Ramesh; we'd greatly appreciate
                  the help! Credit will be given where credit is due.
                </li>
              </ul>
            </li>
          </ul>
          <p className="mb-2">
            Examples of use cases NOT PERMITTED without prior written permission
            include, but are not limited to, the following:
          </p>
          <ul className="mb-4 list-disc pl-10">
            <li>
              Hosting the contents of this website under a different website
            </li>
            <li>Using this guide in a paid class</li>
            <li>
              Using the curriculum (topic lists, topic ordering, problem sets,
              resource lists), modified or otherwise, in a paid class
            </li>
            <li>
              Modifying the curriculum and selling access to the modified
              curriculum or using the modified curriculum in a paid class
            </li>
          </ul>
          <p className="mb-4">
            We reserve the right to revoke permission to use any version of this
            site at any time, including any or all of the permitted use cases
            described above.
          </p>
          <p className="mb-6">
            If you have questions regarding the usage of this site, or would
            like to request to use these resources outside of the authorized use
            cases described above, please contact us at{' '}
            <a
              href="mailto:contact@usamoguide.com"
              className="text-[#F0C2FF] underline hover:text-[#F4EDEA]"
            >
              contact@usamoguide.com
            </a>
            .
          </p>
          <Link
            to="/"
            className="mb-4 block text-[#F0C2FF] underline hover:text-[#F4EDEA]"
          >
            &larr; Back to Home
          </Link>
        </div>
        </div>
      </div>
    </Layout>
  );
}
