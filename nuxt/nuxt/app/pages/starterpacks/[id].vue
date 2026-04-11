<script setup>
  const route = useRoute();
  const itemId = route.params.id;

  const { data: item } = await useFetch(`/api/items/${itemId}`);

  const formdata = ref({
    cardNumber: '',
    date: '',
    cvc: '',
    name: '',
    address: '',
    itemId: itemId
  });

  const submitform = async () => {
    const res = await $fetch('/api/subscription/create', {
      method: 'POST',
      body: formdata.value
    });
    alert(
      'Subscription created successfully!{response: ' +
        JSON.stringify(res) +
        '}'
    );
  };
</script>

<template>
  <div>
    <NuxtLink to="/starterpacks" class="text-gray-600 flex items-center ml-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        class="text-gray-600 w-5 h-5 mt-0.5"
      >
        <!-- Icon from Material Symbols Light by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
        <path
          fill="currentColor"
          d="M11.25 17.308L5.942 12l5.308-5.308l.708.708L7.364 12l4.594 4.6zm6.1 0L12.042 12l5.308-5.308l.708.708l-4.594 4.6l4.594 4.6z"
        />
      </svg>
      <h1 class="mr-4">back</h1>
    </NuxtLink>
    <div class="m-8">
      <strong class="text-gray-900 font-bold">
        You're Almost in - Start your 3-Day Free Trial Now!
      </strong>
      <h1 class="text-gray-700 mt-4">
        Set up your account to gain instant access! You wont be charged if you
        decide to cancel within the 3-days
      </h1>
    </div>
  </div>
  <div class="flex justify-between m-6">
    <div class="flex justify-center w-full">
      <div
        class="relative border-2 h-full p-6 w-full bg-white rounded-xl max-w-[400px] hover:border-green-800 hover:border-3"
      >
        <div
          class="absolute top-0 left-0 h-2 w-full rounded-t-3xl bg-gradient-to-r from-green-500 to-blue-400"
        ></div>

        <div class="border-b-2 border-gray-300">
          <h2 class="text-2xl text-gray-900 mb-6">{{ item.title }}</h2>
          <div class="bg-gray-200 rounded-sm text-gray-800 inline">
            <h3 class="w-fit inline p-3">{{ item.period }}</h3>
          </div>
          <div class="flex items-end mt-4">
            <strong>
              <h1 class="text-4xl text-gray-900">{{ item.price }}</h1>
            </strong>
            <h1 class="text-gray-600 mb-1">/{{ item.payment_frequency }}</h1>
          </div>
          <div
            v-if="item.type == 'annual'"
            class="flex items-center mt-2 text-gray-600"
          >
            <h3 class="mr-2">billed yearly at</h3>
            <h3 class="line-through mr-2">{{ item.price_for_year }}</h3>
            <h3>{{ item.discount_price }}</h3>
          </div>

          <div
            class="bg-green-100 text-green-700 w-fit px-2 py-1 mt-2 mb-4 font-semibold rounded"
          >
            {{ item.savings }}
          </div>
        </div>

        <div class="mt-4">
          <div v-for="(text, index) in item.texts" :key="index" class="mb-4">
            <div class="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                class="text-lime-500 w-4 h-4 mr-3 mt-1 shrink-0"
              >
                <path
                  fill="currentColor"
                  d="M240 128a15.79 15.79 0 0 1-10.5 15l-63.44 23.07L143 229.5a16 16 0 0 1-30 0l-23.06-63.44L26.5 143a16 16 0 0 1 0-30l63.44-23.06L113 26.5a16 16 0 0 1 30 0l23.07 63.44L229.5 113a15.79 15.79 0 0 1 10.5 15"
                />
              </svg>
              <div>
                <div class="flex">
                  <strong>
                    <h2 class="text-gray-800 mr-1">
                      {{ text.strong }}
                    </h2>
                  </strong>
                  <h2 class="text-gray-900 text-lg">{{ text.main }}</h2>
                </div>
                <h2 v-if="text.additional" class="text-gray-600 mt-1">
                  {{ text.additional }}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <pre>{{ item }}</pre> -->
    <div>
      <form @submit.prevent="submitform" class="flex w-full justify-center">
        <div class="flexs mr-10 w-full max-w-xl">
          <div class="relative border-2 h-full p-6 w-full bg-white rounded-xl">
            <div class="border-b-2 border-gray-300 mb-6 pb-4">
              <h2 class="text-2xl text-gray-900 mb-6 font-bold">
                Order Summary
              </h2>

              <div class="flex justify-between items-center mb-4">
                <h2 class="text-gray-800">{{ item.title }}</h2>
                <h2 class="text-gray-800">{{ item.price_for_year }}</h2>
              </div>

              <div class="flex justify-between items-center mb-4">
                <div class="flex items-end">
                  <h2 class="text-gray-800">Total Due</h2>
                  <h2 class="text-gray-600 ml-2">
                    (*not including sales tax where applicable)
                  </h2>
                </div>
                <h2 class="text-gray-800">{{ item.price_for_year }}</h2>
              </div>

              <div class="flex justify-between items-end mt-4 mb-6">
                <strong
                  ><h2 class="text-gray-900 text-lg mb-1">Due Today</h2></strong
                >
                <strong><h1 class="text-2xl text-gray-900">$0.00</h1></strong>
              </div>

              <div
                class="bg-gray-100 rounded-sm text-black p-3 text-center mb-4 font-semibold"
              >
                <h2>Includes 3-Day Free Trial</h2>
              </div>
            </div>

            <div class="mt-4">
              <div class="flex items-center mb-6 text-gray-900">
                <h2 class="text-2xl mr-2 font-bold">Billing Information</h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  class="text-white bg-gray-400 rounded-full w-6 h-6 p-0.1"
                >
                  <!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
                  <path
                    fill="currentColor"
                    d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
                  />
                </svg>
              </div>

              <div class="mb-6">
                <h2 class="text-gray-600 mb-2">Card Details</h2>
                <div
                  class="flex items-center p-2 border border-gray-300 rounded bg-white text-gray-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    class="w-30 h-8 text-gray-600"
                  >
                    <!-- Icon from Material Symbols Light by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
                    <path
                      fill="currentColor"
                      d="M3 19V5h18v14zM4 8.808h16V6H4zM4 18h16v-6.808H4zm0 0V6z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Number"
                    class="w-full bg-transparent outline-none placeholder-gray-400"
                    v-model="formdata.cardNumber"
                  />
                  <input
                    type="text"
                    placeholder="MM / YY"
                    class="w-24 border-l border-gray-300 pl-2 ml-2 bg-transparent outline-none placeholder-gray-400 text-center"
                    v-model="formdata.date"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    class="w-24 border-l border-gray-300 pl-2 ml-2 bg-transparent outline-none placeholder-gray-400 text-center"
                    v-model="formdata.cvc"
                  />
                </div>
              </div>

              <div class="mb-6">
                <h2 class="text-gray-600 mb-2">Address</h2>
                <div class="p-4 border border-gray-300 rounded bg-gray-100">
                  <div class="mb-4">
                    <h2 class="text-gray-600 mb-1">Full name</h2>
                    <input
                      type="text"
                      class="w-full p-2 border border-gray-300 rounded bg-white text-black outline-none"
                      v-model="formdata.name"
                    />
                  </div>
                  <div>
                    <h2 class="text-gray-600 mb-1">Address</h2>
                    <input
                      type="text"
                      class="w-full p-2 border border-gray-300 rounded bg-white text-black outline-none h-10"
                      v-model="formdata.address"
                    />
                  </div>
                </div>
              </div>

              <div class="flex items-start mb-6">
                <input
                  type="checkbox"
                  class="appearance-none w-5 h-5 mr-3 mt-1 shrink-0 bg-white border border-gray-300 rounded cursor-pointer hover:border-green-800 checked:bg-green-800"
                />

                <div>
                  <h2 class="text-gray-600">
                    I consent to
                    <strong
                      ><a href="#" class="text-gray-900 underline"
                        >Terms of Use</a
                      ></strong
                    >
                    and understand my 3-day free trial will automatically
                    convert to $2,490.00 per year starting on. The year fee will
                    be automatically charged each year going forward unless I
                    cancele my account at least one bisnes day before the end of
                    current billing period, wich can be done by calling (888)
                    463-3163
                  </h2>
                </div>
              </div>

              <button
                class="bg-gray-300 rounded-sm text-gray-500 font-bold mb-4 p-3 text-center cursor-pointer"
              >
                <h2>Try It Free</h2>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
