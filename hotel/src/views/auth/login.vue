<template>
  <form class="w-screen h-screen grid">
    <div class="grid bg-secondary p-4 place-self-center rounded-xl drop-shadow-xl">
      <RouterLink to="/" class="justify-self-end">
        <img src="/icons/No.svg" alt="" class="w-7">
      </RouterLink>
      <div class="py-1 sm:py-4 px-6 sm:px-16 grid">
        <h1 class="text-3xl sm:text-4xl tracking-wider justify-self-center text-darkGreen font-bold font-cambria">LOGIN</h1>

        <!-- <div v-if="error">
          <p class="text-red-600 font-cambria-bold">{{ error.message }}</p>
        </div> -->

        <div class="mt-4 sm:mt-6">
          <label
            for="email"
            class="text-md block font-bold tracking-wider text-darkGreen font-cambria"
          >
            E-mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="youremail@example.com"
            class="font-cambria text-darkGreen rounded-2xl mt-1 block border-2 bg-secondary border-darkGreen p-2 "
        
          />
        </div>

        <div class="mt-4 sm:mt-6">
          <label
            for="password"
            class="text-md block font-bold tracking-wider  text-darkGreen font-cambria"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your password"
            class="font-cambria text-darkGreen rounded-2xl mt-1 block border-2 border-darkGreen p-2 focus:outline-none focus-visible:ring-2 focus-visible:border-yellow-600 focus-visible:ring-yellow-600"
         
            />
        </div>

        <button
          class="font-cambria rounded-xl mt-10 w-full bg-accent py-2 px-4 font-bold  text-secondary"
        >
          Login
        </button>
        <div class="flex justify-center">
          <RouterLink
            class="font-cambria mt-4 inline-block text-sm text-darkGreen"
            to="/auth/register"
          >
           No account yet? <span class="underline text-accent font-cambria font-bold">Register here</span>
          </RouterLink>
        </div>
      </div>
      
    </div>
    
  </form>
</template>