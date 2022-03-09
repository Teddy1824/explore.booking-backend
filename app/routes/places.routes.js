const express = require("express")

const app = express.Router()

let places = [
    {
        id: "1",
        place: "The Palace of the Lost City",
        location: "Sun City, Rustenburg, 0316",
        img: {
            0: "https://lh3.googleusercontent.com/p/AF1QipORhrNlOh7fsd2JXmmGRKNSkJiPSsrpGXknDKBS=w296-h202-n-k-rw-no-v1",
            1: "https://lh3.googleusercontent.com/proxy/4xAOBSFbHwXtGJqHn6UEtFFy-J2AK429mUHioL8J0zm_JwQbMwUWanOm8cGKu2UH4f1wnp_9EhNi25gbolNNgMWFZ-T1xxn4PilzCi47kc3QEAp0iRm49n5LHLXt_g7b_0bZHfnpe-V9FDPjsu-iDtBOQx3Jxw=w296-h202-n-k-rw-no-v1",
            2: "https://lh3.googleusercontent.com/p/AF1QipP1B4A1PP_pGssGJQM5xq5pLfIG5yVRcj_-LBfp=w296-h202-n-k-rw-no-v1",
            3: "https://lh3.googleusercontent.com/proxy/OI4zFxiLDZ1jGb_HbIiFohwmp1TG9w6VXtJsXTDiyK_kMGxqlqpZWMrOyIXwYycxwCh96Rc3iy1B7RULd7GmVLEYbfT_sj7GXzgPHm9McluzbI8YMpSJ_dFo-cMUbVxy4M98YOqARnxEgj3Qc-_kD4kJUcB6XuQ=w296-h202-n-k-rw-no-v1"
        },
        category: "Hotel",
        description: "Opulent resort hotel offering elegant rooms, plus 5 restaurants, a day spa & an outdoor pool",
        price: "R4.404"
    },
    {
        id: "2",
        place: "The Bay Hotel",
        location: "69 Victoria Rd, Camps Bay, Cape Town, 8001",
        img: {
            0: "https://lh3.googleusercontent.com/p/AF1QipMpPL4FmrzFACKZ82YIMfTDt7zM8pt5a9v5MGFi=w296-h202-n-k-rw-no-v1",
            1: "https://lh3.googleusercontent.com/proxy/qG-i3QtTZ_4-JECadnYgkTm0CQJFSF02T5_aMFhKQl3ybaHBuhQByIHdgzA8pbq6m3-NcN_pZ_Uby3YVtpA-fsT8eBn5ZztthxAFKZ8fyROk1VMygdr4fcGOHakKxENZendb6MYa7m5Y-hsLEfFfvqHgcVKKjt8=w296-h202-n-k-rw-no-v1",
            2: "https://lh3.googleusercontent.com/p/AF1QipOvzClENXsQfo5WhaEjfTlSnXSawO7wicl2vWQi=w296-h202-n-k-rw-no-v1",
            3: "https://lh3.googleusercontent.com/p/AF1QipMtzfEQzG-5Q0jqgaeiCp-KWEo_C3xQJMYsGJpK=w296-h202-n-k-rw-no-v1"
        },
        category: "Hotel",
        description: "Airy quarters in upscale beachside hotel with free breakfast, casual dining & stylish poolside bars.",
        price: "R2.603"
    },
    {
        id: "3",
        place: "Ellerman House",
        location: "180 Kloof Rd, Bantry Bay, Cape Town, 8005",
        img: {
            0: "https://lh3.googleusercontent.com/p/AF1QipPgpRjV1ATahB9g7Ssf-mWfsaAlUO7yKmpX1qhU=w296-h202-n-k-rw-no-v1",
            1: "https://lh3.googleusercontent.com/proxy/heDJU-BVJShQIUSa7VOeZ8ldH9F9uMVD1L8Qof_UbTYQ9R_rFhhaC2NNdHM6aQycQeT0Xw4EDW5JTwYA66GD_z0iK1PM3zCw18O46Ayij9dkV1LDYUGCPMYoQOt6O1moG5U9HaziHeYCF2pe-bEnJ4gHqCsJGQ=w296-h202-n-k-rw-no-v1",
            2: "https://lh3.googleusercontent.com/proxy/Edeo5AFFXhMBwPagwLJk4ZrLCoJgWvM6S_bWyrcxDbxO2XUMxra4C4djHfK7csowEGMXSyOsQKHXpa95A03ngVPocXjhHyD61K6bWhdcbbOXMxQL1p2xKC4AJ1oj8_AGCHriFQ8LGDoV8kQmApP8CqiS1TaWZg=w296-h202-n-k-rw-no-v1",
            3: "https://lh3.googleusercontent.com/proxy/odOI_cIDQvHM-8uUkMcKIMXgP5Y9alho6JRkRfFxdDqs5Zp2bvhc7YCQ-3-E-t7ZkKczbUU41Xx27mHI9sAdWOLOV8VZhlyPSVkRLumDgzhHwGc1H_8JMcJaaxywau9nBR5lB9LoZ96QRg5yj37xg2gWYn3ZDg=w296-h202-n-k-rw-no-v1"
        },
        category: "Hotel",
        description: "Polished, upscale hotel with ocean views, plus farm-to-table dining, a spa & free breakfast.",
        price: "R27.128"
    },
    {
        id: "4",
        place: "Sun City Resort",
        location: "R556, Sun City, 0316",
        img: {
            0: "https://lh3.googleusercontent.com/p/AF1QipOjV6q1bzTaSE1gmzd6f8mVfyLjeVQCsQoCPU1F=w296-h202-n-k-rw-no-v1",
            1: "https://lh3.googleusercontent.com/proxy/dwwVaX_RFNAqp2lz9PXto-fMyD-9b5NBBOIprXx1Au7dGngEd-HOZH_LqfiMUpJWjlzbWkyxWrBo7sSI-izTqf3mRGZVVFhoFKXTOlQYVA5oJrm7KDJkwQzoMHzRvFyjx-2VaQobmhfTV4l7Ib_96_VyzBqKxg=w296-h202-n-k-rw-no-v1",
            2: "https://lh3.googleusercontent.com/proxy/tMZDaOzYx1cqJ_z5LV9Yy1YsIyhqWuuID2T7CezE2JW-MF49phI6NgC3zGUtvi_EpU2ITPRjt2yYEqedhfvPqOF2vAJKb4zVK5RZpXrl6z5Uq_aITsNzYKbld9uGretMp7EOL_spKXxu0Uz1i_va-KkxlRTSug=w296-h202-n-k-rw-no-v1",
            3: "https://lh3.googleusercontent.com/proxy/Jj3_p-dJ0UI_PloNNWAWggqkOoVt0dTGvazkRsLbLQxqiyVduLgL1Qp8hj6uCUGtb7Eb6g5tOqdmlwQlQ3o3Otsr2kNKTMXS_nneT_OA68gOsIdPVj57jeX-TA0noVRQWW2_Zdmgu3EUrYY1gTnlQ9FVPjsWUzE=w296-h202-n-k-rw-no-v1"
        },
        category: "Resort",
        description: "Refined quarters in a resort with outdoor pools, 2 water parks & multiple restaurants & bars.",
        price: "R4.210"
    },
    {
        id: "5",
        place: "The Kingdom Resort",
        location: "R556, South Village, Pilanesberg National Park, 0316",
        img: {
            0: "https://lh3.googleusercontent.com/proxy/eaEYsEAr02QD2D1TSgf8wNWz9e5C8B-hL3DgCBW7B0SsyekWk1VPYjAuyEJWvNwKGfE89gjCeB6XhavnkT_uIUeLXNnl2pqJQhdpi3s8A4XZehA9QYV4rA9vspR_Bx7hihDZ-GwP55Rsyo7z_4h_bGA14cMilww=w296-h202-n-k-rw-no-v1",
            1: "https://lh3.googleusercontent.com/proxy/e0nOIxESn-Cmxd48Cr3Jv9u4xZXaVvGj8kY7bkoc6tDQ7HVJMSeVZskVSooWGwwsK59s9SX6cqrkNnG5uOF1ff1PVnOpmnJeFRSvRvBOH8NyE8g_PM__vnDCopeDmLXjT0HzPnFohoMLGtBg0fjxDFIBq3jv-dI=w296-h202-n-k-rw-no-v1",
            2: "https://lh3.googleusercontent.com/p/AF1QipMz0L5c9ipg3q8F-Bq50v3SAcHTkmXCK3eP9GjB=w296-h202-n-k-rw-no-v1",
            3: "https://lh3.googleusercontent.com/proxy/TEoDZBUEhKpWLNtBGwAaFcBua1yZ5Xk8EsMXp4idmvGjtzb_KHIEx4ku5sE56LYuThos-_e_-_eT4jEXBc-EoK-NUeFNt71ynTcIuededdzqQpK2pc88fnU_HUGh5TgPU8F2ooHTy84t4lN4J-1HlXgCHvHCIg=w296-h202-n-k-rw-no-v1"
        },
        category: "Resort",
        description: "Contemporary rooms, chalets and villas, some with plunge pools, plus a waterpark and a restaurant.",
        price: "R998"
    },
    {
        id: "6",
        place: "Cayley Mountain Resort",
        location: "D184, Cathkin Park, 3310",
        img: {
            0: "https://lh3.googleusercontent.com/proxy/Cdd-GKchxMwQi8PvjJSHtO5fRYLp5MiYUU1VMwiqc2jGzBpb3ackYbWMTn63Wb3Bgu1LuqRPRxryp6QEvQS6hi4-l88_CGehAfOMGnhgW64vcWEyrH1cOTwb2LlP89NWfxN5dY38jNcdSL0cgqby-c9y975VDw=w296-h202-n-k-rw-no-v1",
            1: "https://lh3.googleusercontent.com/proxy/Q3vdvzAun5pXRiAMbkahdXpGKImKARU3msM1L1RCJN7_jFsVYmCmbZgMCR_dU8RNmK74rlM63hGIgZJvDljXyz2qd-s2M7DTt2gg2k8yBbTVTaN9RigdyzMUlFdhqOMHp42jpQoAjafB3UmCvdgsxPqZn5fidA=w296-h202-n-k-rw-no-v1",
            2: "https://lh3.googleusercontent.com/p/AF1QipP8tzATYqCGhN-jCYZgGL14B7LlPBhwgtG1LiIK=w296-h202-n-k-rw-no-v1",
            3: "https://lh3.googleusercontent.com/proxy/wXVkd9s33K_N1s9FovZxdpbys6lJv_8KhxfAlG_mjD9WPIBRUzoDIh43GokH0lDaBdFr_y8oub69sp-OmWr6cszTe1FQ4uZ6nolV2k5pE-uhabrbSdjPFTtweKOcbED27dPe0WKLcwnZ-asaUHBH-2QU5dILpA=w296-h202-n-k-rw-no-v1"
        },
        category: "Resort",
        description: "An amazing resort with a beautiful view, pool surrounded by nature and modern interior design.",
        price: "R1.001"
    },
    {
        id: "7",
        place: "SlipAway",
        location: "9 Pentelbury's Place, 14 Pickle Street, Strand, 7140 Strand",
        img: {
            0: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/304391496.jpg?k=5118172b27dd0b3409896c99bfcdb24e7c43e757e63cfe83a69678c3d4169616&o=&hp=1",
            1: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/304391555.jpg?k=2564aeb9d23f4949895d058ecad8feaf8f86648ab73c7b482f9bfe8514ace727&o=&hp=1",
            2: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/304391560.jpg?k=c8594a8e3ceaa28d7d1777b64e3ac2ba8a1109c9ceb84a6a2a1a432102efd22e&o=&hp=1",
            3: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/304391541.jpg?k=bbf3491b4753cc0c711bc88ed091238e5f47952e839191edcc931bd1b14c5491&o=&hp=1"
        },
        category: "Apartment",
        description: "The apartment comes with 1 bedroom, 1 bathroom, bed linen, towels, a flat-screen TV with satellite channels, a fully equipped kitchen, and a patio with sea views.",
        price: "R3.732"
    },
    {
        id: "8",
        place: "Ashley on Beach",
        location: "47 Beach Road 409 Welgelegen, 7140 Strand, South Africa",
        img: {
            0: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/330590160.jpg?k=bd2ef57650ffa68424b3d79e19afb10af8c1362e93cbb237f481d9b92869874e&o=&hp=1",
            1: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/340583651.jpg?k=f77360a4ffec3a918033be1e1bc1e3dfbfc0a8a00a8b8e253c41f1fb9d5f4579&o=&hp=1",
            2: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/340583403.jpg?k=4cda5092232a19b745b2003aaa03ad8f65ae610cda0d414fb98161a46bad181c&o=&hp=1",
            3: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/334347635.jpg?k=ecd3ed1ccccbc42f36984ad009386235ddce6fe31273d54f4509a716483cb6fe&o=&hp=1"
        },
        category: "Apartment",
        description: "Featuring a kitchen with a microwave and a fridge, each unit also comes with a satellite flat-screen TV, ironing facilities, desk and a seating area with a sofa. There is a private bathroom with shower in all units, along with a hairdryer and free toiletries.",
        price: "R6.240"
    },
    {
        id: "9",
        place: "Loddey's Self Catering Apartments",
        location: "Ocean View Apartments, C/O Beach Road and Culenborg Street, 7140 Strand, South Africa",
        img: {
            0: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/48494803.jpg?k=66939cf269879c0701155c444af18ba27acf3766f2f6a918eb7f5888367cc894&o=&hp=1",
            1: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/174355036.jpg?k=951a21d4ee7807cbc006ee08ce4c5b21594e57a3e393be62105515b23ca652d4&o=&hp=1",
            2: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/174355005.jpg?k=d39f43f9614e9aed6c0d710730f7d791a07d2b0262c6e7458896521035bfa8d7&o=&hp=1",
            3: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/174352132.jpg?k=1931a7f840629930d0f00a094aa279202818df08694df91814c27a73d5d37817&o=&hp=1"
        },
        category: "Apartment",
        description: "All units include a flat-screen TV with satellite channels. Some units feature a seating area and/or balcony. There is also a kitchen, equipped with a dishwasher, oven and microwave. A toaster, a refrigerator and stovetop are also featured, as well as a kettle. Towels and bed linen are provided.",
        price: "R7.360"
    },
    {
        id: "10",
        place: "Hibernian Towers 505 Self Catering Apartment",
        location: "Kruger Street 505, 7139 Strand, South Africa",
        img: {
            0: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/159932941.jpg?k=ff85fd2cc1f5bd7add9b5a42712a0a24fc088867a2dd4adce7444e5c81849d96&o=&hp=1",
            1: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/159937115.jpg?k=d75e28480c55fe8c9223bc1a19375a0ffec7977b1b7412cf34e2f8f50c912642&o=&hp=1",
            2: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/159936967.jpg?k=0b32a6cd6f9d3a31182d99eba0e26355001b7c7c1cdb55258d9726e2c2326767&o=&hp=1",
            3: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/159937065.jpg?k=f7e040ab4035be68bba2f589ef79796b5a2bc2dd261654ee047b8e73a8f616b0&o=&hp=1"
        },
        category: "Apartment",
        description: "The apartment features 4 bedrooms and a kitchen with a dishwasher. The unit has a washing machine and Smart TV with satellite channels.",
        price: "R11.490"
    },
    {
        id: "11",
        place: "Monkey Valley Resort",
        location: "1 Mountain Rd, Chapmans Peak, Cape Town, 7985",
        img: {
            0: "https://lh3.googleusercontent.com/p/AF1QipOlu-dlgoO3W54kgM7PYqdR_lnHlBGpPViVNAyF=w296-h202-n-k-rw-no-v1",
            1: "https://lh3.googleusercontent.com/p/AF1QipPANjylv1aCuy6f8LtjLXRmfCOECrr4doqbFg0-=w296-h202-n-k-rw-no-v1",
            2: "https://lh3.googleusercontent.com/p/AF1QipOPF9knQDuYsRHLikJU-kz-_7YhqpCTn6I-nGxM=w296-h202-n-k-rw-no-v1",
            3: "https://lh3.googleusercontent.com/p/AF1QipMScAZDbp0KQ6r5sTwnCyS1e5eNeGutJNsOS4AI=w296-h202-n-k-rw-no-v1"
        },
        category: "Resort",
        description: "Rustic-chic accommodations in a forest hideaway with beach access, dining & an outdoor pool.",
        price: "R1.467"
    },
    {
        id: "12",
        place: "Protea Hotel Fire & Ice!",
        location: "64 New Church St, Tamboerskloof, Cape Town, 8018",
        img: {
            0: "https://lh3.googleusercontent.com/p/AF1QipM9FHr1C9TP392ydMmQVqAbeUFWElu-f676lQ5v=w296-h202-n-k-rw-no-v1",
            1: "https://lh3.googleusercontent.com/p/AF1QipM9LqepbBst5pZDmA_hPhkGwMbGz0o4q2cfF8NP=w296-h202-n-k-rw-no-v1",
            2: "https://lh3.googleusercontent.com/p/AF1QipNC_qZ0pORXRpKIhh31EYTCZ6E2aS7aCh1Bs1Lo=w296-h202-n-k-rw-no-v1",
            3: "https://lh3.googleusercontent.com/p/AF1QipOMB5hT16iSfHZAVwHgO_LI33btk9mhFoNGzOyh=w296-h202-n-k-rw-no-v1"
        },
        category: "Hotel",
        description: "Chic rooms with free WiFi, plus an outdoor pool, a restaurant, a lounge bar and free bike rental.",
        price: "R1.184"
    }
]

app.get("/", async (req, res) => {
    res.send(places);
});

app.get("/", (req, res) => {
    const place = places.find(place => place.id === req.params.id);
    if (!place) res.status(404).send('Place not found... :(')
    res.send(place)
});

app.post("/", (req, res) => {
    const place = {
        id: places.length + 1,
        place: req.body.place,
        location: req.body.location,
        img: req.body.img[0],
        category: req.body.category,
        description: req.body.description,
        price: req.body.price
    }
    places.push(place);
    res.send(place);
});

app.put("/:id", (req, res) => {
    const place = places.find(c => c.id == parseInt(req.params.id));
    if (!place) res.status(404).send({ msg:'The requested place is not found.' })
    place.place = req.body.place;
    res.send(place);
});

app.delete("/:id", (req, res) => {
    places = places.filter((place) => place.id != req.params.id);
    res.send({ msg:'Place removed' })
})

module.exports = app

