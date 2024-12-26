const mongoose=require('mongoose')

const product=require('./models/Product')

const products=[
    {
        name:"iphone 14",
        img:"https://unsplash.com/photos/silver-iphone-6-and-red-iphone-case-OKjJZNTl004",
        price:130000,
        desc:"very costly"
    },
    {
        name:"iphone 14 pro",
        img:"https://unsplash.com/photos/black-iphone-5-on-white-paper-LXWUK-gypVc",
        price:130000,
        desc:"very costly"
    },
    {
        name:"iphone 15",
        img:"https://www.google.com/imgres?q=phonepe&imgurl=https%3A%2F%2Fwww.fintechfutures.com%2Ffiles%2F2023%2F01%2Fphonepe-logo-icon.jpg&imgrefurl=https%3A%2F%2Fwww.fintechfutures.com%2F2024%2F01%2Findian-fintech-phonepe-names-ritesh-pai-as-ceo-of-international-payments%2F&docid=2x78RdwJlots2M&tbnid=FOP_GDVtkKpPPM&vet=12ahUKEwjc8ped9bOKAxWfR2wGHdWkMr0QM3oECBgQAA..i&w=550&h=550&hcb=2&ved=2ahUKEwjc8ped9bOKAxWfR2wGHdWkMr0QM3oECBgQAA",
        price:130000,
        desc:"very costly"
    },
    {
        name:"iphone 15 pro",
        img:"https://unsplash.com/photos/person-holding-black-iphone-4-3xFwO_wTrkg",
        price:130000,
        desc:"very very costly"
    }
]

async function seeddb(){
    await product.insertMany(products)
    console.log('data seeded successfully')
}

module.exports=seeddb