import { PrismaClient } from "../generated/prisma/index.js"

const prisma = new PrismaClient()

async function main() {
    // Use upsert to avoid duplicate errors if you run the seed twice
    // const user = await prisma.user.upsert({
    //     where: { email: 'dev@example.com' },
    //     update: {},
    //     create: {
    //         email: 'dev@example.com',
    //         name: 'Test User',
    //         posts: {
    //             create: { title: 'Hello World' },
    //         },
    //     },
    // })

    const hosterlyPartner = await prisma.hostelry_partner.upsert({
        where: { hostelry_id: 1 },
        update: {},
        create: {
            hostelry_id: 1,
            hostelry_name: 'Sapadia',
            hostelry_location: 'Tuktuk',
            hostelry_level: 4,
            hostelry_address: 'google.com/maps/place/hotel+indonesia/data=!4m2!3m1!1s0x2e69f421963cd607:0x503cb9e9306e657a?sa=X&ved=1t:242&ictx=111'
        }
    })

    const packageTourProduct = await prisma.package_tour_product.upsert({
        where: { package_id: 1 },
        update: {},
        create: {
            package_id: 1,
            name_package: "Tuktuk Tour",
            cost: '30000',
            description: 'Berkeliling tuktuk siadong',
            start_date: '2024-03-16T14:30:00Z',
            end_date: '2024-03-16T14:30:00Z',
            activities: '[{"day": "1", "title":"Traditional Market"}]',
            quota: 5,
            hostelry_partner_id: 1,
        }
    })


    const paymentMethod = await prisma.payment_methods.upsert({
        where: { payment_methods_id: 1 },
        update: {},
        create: {
            payment_methods_id: 1,
            code: 'TF_BCA',
            name: 'Transfer Bank BCA',
            type: 'TRANSFER_BANK',
            destination_account: '22200000',
            is_active: true
        }
    })

    console.log(hosterlyPartner, packageTourProduct, paymentMethod)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })