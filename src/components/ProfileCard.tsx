import { Card, CardBody, CardHeader } from '@heroui/react'
import React from 'react'

const ProfileCard = () => {
    return (
        <Card className="w-[350px] h-[450px] bg-black/10 backdrop-blur-xl rounded-lg border border-black/20 shadow-lg p-5 overflow-hidden transition-all duration-300">
            <CardHeader className="border-b border-black/10 pb-4">
                Title</CardHeader>
            <CardBody>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, quia reiciendis. Est, officiis. Officiis sit dolore aut corrupti minima laboriosam placeat. Suscipit molestias rem deleniti reiciendis veritatis labore at, animi laborum aliquam debitis!
            </CardBody>
        </Card>
    )
}

export default ProfileCard