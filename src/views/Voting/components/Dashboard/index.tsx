import Link from 'next/link'

const Dashboard = () => {
  return (
    <div>
      <section className="banner-area py-10 relative">
        <div className="container">
          <div className="grid items-center gap-6 lg:grid-cols-12 z-40 relative">
            <div className="lg:col-span-1" />
            <div className="lg:col-span-10">
              <div className="banner-content text-center" data-aos="fade-up">
                <h1 className="text-3xl lg:text-6xl mb-8">Engage - Vote - Build</h1>
                <p className="text-xl lg:text-3xl leading-relaxed mb-8">
                  Governance for platform features on the PrivateX network decided by you.A one place stop to privatize
                  and make the blockchain transactions anonymous.Have your say in deciding tokens and coins you want to
                  privatize.
                </p>
                <button
                  type="button"
                  className="button inline-block button-gradient border-2 border-white px-8 py-3 text-coolGray-200 text-lg font-bold rounded-full shadow transition duration-500"
                >
                  <Link href="/#learn-more">Learn more</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="roadmap-area bg-gradient pt-10 pb-20 relative" id="learn-more">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-12 z-40 relative">
            <div className="lg:col-span-2" />
            <div className="lg:col-span-8">
              <h2 className="section-title text-4xl text-center mb-14">
                Have a great idea? Submit a proposal to make it happen and get community support.
              </h2>
            </div>
          </div>
          <div className="roadmap-container grid gap-6 lg:grid-cols-12 z-40 relative">
            <div className="lg:col-span-4">
              <div className="community-box roadmap-bottom1 text-center" data-aos="fade-up">
                <div className="inline-flex items-center justify-center community-icon rounded-full bg-white/[.1] mx-auto mb-5">
                  <img src="assets/images/community-icon1.svg" alt="title" />
                </div>
                <h4 className="font-bold text-2xl mb-4">Engage</h4>
                <p className="text-coolGray-200">
                  Interact with the community through the Forum to discuss ideas and proposals.
                </p>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="community-box roadmap-bottom2 text-center" data-aos="fade-up">
                <div className="inline-flex items-center justify-center community-icon rounded-full bg-white/[.1] mx-auto mb-5">
                  <img src="assets/images/community-icon2.svg" alt="title" />
                </div>
                <h4 className="font-bold text-2xl mb-4">Vote</h4>
                <p className="text-coolGray-200">
                  Interact with the community through the Forum to discuss ideas and proposals.
                </p>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="community-box roadmap-bottom2 text-center" data-aos="fade-up">
                <div className="inline-flex items-center justify-center community-icon rounded-full bg-white/[.1] mx-auto mb-5">
                  <img src="assets/images/community-icon3.svg" alt="title" />
                </div>
                <h4 className="font-bold text-2xl mb-4">Track</h4>
                <p className="text-coolGray-200">
                  Interact with the community through the Forum to discuss ideas and proposals.
                </p>
              </div>
            </div>
          </div>
          <div className="roadmap-container grid gap-6 lg:grid-cols-12 z-40 relative">
            <div className="lg:col-span-2" />
            <div className="lg:col-span-4">
              <div className="community-box text-center" data-aos="fade-up">
                <div className="inline-flex items-center justify-center community-icon rounded-full bg-white/[.1] mx-auto mb-5">
                  <img src="assets/images/community-icon4.svg" alt="title" />
                </div>
                <h4 className="font-bold text-2xl mb-4">Engage</h4>
                <p className="text-coolGray-200">
                  Interact with the community through the Forum to discuss ideas and proposals.
                </p>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="community-box roadmap-top1 text-center" data-aos="fade-up">
                <div className="inline-flex items-center justify-center community-icon rounded-full bg-white/[.1] mx-auto mb-5">
                  <img src="assets/images/community-icon5.svg" alt="title" />
                </div>
                <h4 className="font-bold text-2xl mb-4">Track</h4>
                <p className="text-coolGray-200">
                  Interact with the community through the Forum to discuss ideas and proposals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
