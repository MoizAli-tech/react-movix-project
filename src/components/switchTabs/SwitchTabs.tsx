import React, { useState } from 'react'
import "./style.scss"

interface Props {
    data: string[],
    onTabChange(tab: string, index: number): void
}

const SwitchTabs: React.FC<Props> = ({ data, onTabChange }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [left, setLeft] = useState(0);
    function activeTab(tab: string, index: number) {
        setLeft(index * 100);
        setTimeout(() => {
            setSelectedTab(index);
        }, 1000)

        onTabChange(tab, index)
    }
    return (
        <div className="switchingTabs">
            <div className="tabItems">
                {
                    data.map((tab, index) => {
                        return (
                            <span
                                onClick={() => activeTab(tab, index)}
                                key={index}
                                className={`tabItem ${selectedTab == index ? "active" : ""}`}>
                                {tab}
                            </span>
                        )
                    })
                }
                <span className="movingBg" style={{ left: left }} />
            </div>
        </div>
    )
}

export default SwitchTabs