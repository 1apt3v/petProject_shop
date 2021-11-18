const initialState = {
    images: [
        { src: 'https://img1.akspic.ru/originals/2/7/6/5/6/165672-metropoliya-synthwave-cifrovoe_iskusstvo-art-risovanie-3840x2160.jpg', alt: '1' },
        { src: 'https://itgame.su/wp-content/uploads/2020/08/screenshot_full_2-scaled.jpg', alt: '2' },
        { src: 'https://img3.akspic.ru/originals/9/4/9/4/6/164949-android-avtomobilnoe_osveshhenie-legkovyye_avtomobili-svet-infrastruktura-3840x2160.jpg', alt: '3' },
    ]
}

const testReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export default testReducer