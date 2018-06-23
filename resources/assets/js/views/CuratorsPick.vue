<template>
    <div>
        <div class="banner">
            <img src="../../img/banner.png" class="banner__image">

            <div class="banner__content d-flex flex-column align-items-center justify-content-center">
                <h1 class="banner__title mt-4 mb-0 text-white">The Curator's Pick</h1>
                <p class="banner__description mt-2 mb-0 text-white text-uppercase">Edition 45</p>
            </div>
        </div>

        <div class="main">
            <h5 class="main__subtitle text-black">The curator's pick for the week is 200+ Pack: Transitions, Titles, Sound FX.</h5>

            <p class="main__content">
                With the 200+ Pack: Transitions, Titles, Sound FX Premiere Pro template you can create exciting slideshows, trailers, presentations and more! This amazing toolkit has everything you need: awesome transitions, animated titles, sound effects, and many FX assets. Download now and get over 200 assets to instantly jumpstart and fuel your creativity!
            </p>

            <div class="main_product">
                <img src="../../img/product1.jpg" class="main__product__image"/>

                <div class="d-sm-flex">
                    <div class="flex-1">
                        <img src="../../img/product2.jpg" class="main__product__image"/>
                    </div>

                    <div class="flex-1">
                        <img src="../../img/product3.jpg" class="main__product__image"/>
                    </div>
                </div>

                <img src="../../img/product4.jpg" class="main__product__image"/>
            </div>

            <div class="main__download text-center">
                <h1 class="main__subtitle m-0 text-black">200+ Pack: Transitions, Titles, Sound FX</h1>

                <p class="mb-0"><i>by</i> <i class="text-black">DaniMotion</i></p>

                <a href="#" class="main__download__link d-inline-block text-white text-center text-uppercase">Download Here</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'curators-pick'
    }
</script>