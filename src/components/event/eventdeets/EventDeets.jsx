import React from 'react'
import './EventDeets.css'

const EventDeets = () => {
    return (
        <div className="eventdeets">
            <div className="eventinfo">
                <img className='eventlogo' src="https://media.istockphoto.com/id/866715034/vector/entrepreneurs-and-business-people-conference-in-modern-meeting-room.jpg?s=612x612&w=0&k=20&c=HViAYHb_7ZXDuoWEM113lHzShRMBFShmHw2LbuwhNJA=" alt="" />
                <h5 className="eventname">Urban Sustainability Summit 2024</h5>
                <div className="event-actions">
                    <button className="discussbtn mainbtn">
                        <i className="tag-icon far fa-calendar-alt"></i>20/08/2024 - 23/09/2027
                    </button>
                    <button className="discussbtn mainbtn">
                        <i className="fa-solid fa-earth-americas"></i>Mode: Online
                    </button>
                    <button className="discussbtn mainbtn">
                        <i className="fa-solid fa-link"></i>Join
                    </button>
                </div>

            </div>

            {/* <div className="eventstats">
                <div className="event-info-items">
                    <div className="info-icon">
                        <i className="fa-solid fa-user-tie"></i>
                    </div>
                    <span>Aakarsh Goyal</span>
                </div>
                <div className="event-info-items">
                    <div className="info-icon">
                        <i className="fa-solid fa-diagram-project"></i>
                    </div>
                    <span>6 Projects</span>
                </div>
                <div className="event-info-items">
                    <div className="info-icon">
                        <i className="fas fa-user-group"></i>
                    </div>
                    <span>39 Members</span>
                </div>
            </div> */}

            <div className="event-desc">
                <h5>Details</h5>
                <span>The Urban Sustainability Summit 2024 is a landmark event hosted by the Department of Urban Development, dedicated to advancing sustainable practices and innovative solutions for the future of urban living. This comprehensive summit will bring together leading experts, policymakers, researchers, community leaders, and stakeholders to explore and address the multifaceted challenges facing urban environments. The event will span three days, providing an extensive platform for discussion, collaboration, and strategic planning aimed at fostering sustainable urban development and enhancing the quality of life in cities.

Event Overview:

Day 1: Opening and Keynote Sessions

The summit will kick off with an opening ceremony featuring distinguished keynote speakers who are pioneers in the fields of urban planning, environmental sustainability, and smart city technologies. The keynote sessions will set the stage for the discussions by highlighting the urgent need for sustainable urban development and sharing groundbreaking insights and innovations. Keynote speakers will include renowned urban planners, environmental scientists, and technology experts who will address topics such as climate change, resource management, and the future of smart cities.

Day 2: Thematic Workshops and Panel Discussions

The second day of the summit will be dedicated to thematic workshops and panel discussions, organized into several tracks focusing on critical aspects of urban sustainability. Each track will delve deeply into specific topics, offering participants the opportunity to engage in hands-on workshops, case study analyses, and interactive discussions.

Track 1: Sustainable Infrastructure and Green Building Practices Workshops in this track will cover advancements in green building technologies, sustainable materials, and energy-efficient design. Participants will learn about the latest trends in constructing eco-friendly buildings, retrofitting existing structures for energy efficiency, and implementing green infrastructure projects such as green roofs and rain gardens.

Track 2: Urban Mobility and Transportation Innovations This track will focus on transforming urban mobility through innovative transportation solutions. Discussions will include electric and autonomous vehicles, smart traffic management systems, public transit enhancements, and the promotion of non-motorized transport modes. Workshops will explore case studies of successful transportation projects and provide participants with tools to design and implement effective transportation strategies.

Track 3: Climate Resilience and Disaster Preparedness Climate resilience and disaster preparedness are critical for safeguarding urban populations against environmental hazards. This track will address strategies for mitigating the impacts of climate change, developing resilient infrastructure, and preparing for natural disasters. Participants will engage in scenario planning exercises and learn about the latest tools and technologies for enhancing urban resilience.

Track 4: Community Engagement and Social Sustainability The focus of this track will be on fostering social sustainability through community engagement and participatory planning. Workshops will cover best practices for involving residents in decision-making processes, addressing social equity issues, and creating inclusive urban spaces that promote community well-being. Participants will learn about successful community engagement strategies and how to apply them in their own projects.

Day 3: Networking and Exhibition

The final day of the summit will feature a networking session and an exhibition showcasing innovative products, services, and technologies related to urban sustainability. The exhibition will provide a platform for companies, startups, and research institutions to present their solutions and engage with attendees. Networking opportunities will facilitate connections between stakeholders and foster collaborations that drive forward the goals of urban sustainability.

Event Highlights:

Interactive Sessions and Roundtables: Attendees will participate in interactive sessions and roundtables, encouraging collaborative problem-solving and the exchange of ideas. These sessions will be designed to address specific challenges and explore potential solutions in a dynamic and engaging format.

Special Interest Groups: Special interest groups will be formed to focus on niche topics within urban sustainability. These groups will offer a forum for deep dives into specific issues, such as waste management, water conservation, and urban agriculture.

Awards Ceremony: An awards ceremony will recognize outstanding achievements and innovations in the field of urban sustainability. Awards will be presented to individuals, organizations, and projects that have made significant contributions to advancing sustainable urban development.

Post-Event Publications and Resources: Following the summit, a comprehensive report will be published, summarizing the key discussions, outcomes, and recommendations. Participants will have access to resources, presentations, and recordings from the event to support ongoing learning and implementation.

Conclusion:

The Urban Sustainability Summit 2024 represents a pivotal opportunity for stakeholders from diverse sectors to come together, share knowledge, and collaborate on creating sustainable urban environments. By addressing the challenges and opportunities of urban development through a multifaceted approach, the summit aims to drive positive change and build a sustainable future for cities. Through its extensive program of keynote sessions, workshops, panel discussions, and networking opportunities, the summit will inspire action, foster innovation, and contribute to the development of resilient and thriving urban communities.</span>
            </div>
        </div>
    )
}

export default EventDeets