<template>
  <div>
    <v-container v-if="!generated">
      <h1 class="text-center">MARS ROVER</h1>
      <v-form ref="initData" v-model="valid" lazy-validation>
        <v-row>
          <v-col>
            <v-text-field v-model="planetSize" label="Planet size" :rules="sizeRules" required> </v-text-field>
          </v-col>

          <v-col>
            <v-text-field v-model="xPosition" label="X position" :rules="positionRules" required></v-text-field>
          </v-col>

          <v-col>
            <v-text-field v-model="yPosition" label="Y position" :rules="positionRules" required></v-text-field>
          </v-col>

          <v-col
            ><v-select
              v-model="facingDirection"
              :items="possibleDirections"
              :rules="[(v) => !!v || 'You need to select a direction']"
              label="Rover direction"
              required
            ></v-select
          ></v-col>

          <v-col
            ><v-select
              v-model="obstacleDensity"
              :items="possibleDensities"
              item-text="name"
              item-value="value"
              :rules="[(v) => !!v || 'You need to select a density']"
              label="Obstacle density"
              required
            ></v-select
          ></v-col>

          <v-col class="text-center mt-4">
            <v-btn :disabled="!valid" color="success" @click="submitInit"> Generate planet </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
    <v-container v-else>
      <v-simple-table class="text-center">
        <template v-slot:default>
          <tbody>
            <tr v-for="(row, i) in terrain" :key="i">
              <td v-for="(col, j) in row" :key="j"><img :src="displayItem(col)" /></td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-col>
        <v-btn color="warning" @click="addInstruction('F')"> Forward </v-btn>
        <v-btn color="warning" @click="addInstruction('B')"> Backward </v-btn>
        <v-btn color="warning" @click="addInstruction('L')"> Left </v-btn>
        <v-btn color="warning" @click="addInstruction('R')"> Right</v-btn>

        <v-btn color="success" @click="sendInstructions"> send instructions </v-btn>
      </v-col>
      <p v-if="collision">The rover had a collision :&#40;</p>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Index', //Name of the page
  data() {
    return {
      valid: true, //If the form is valid. This also controls the enabling of the generate planet button
      generated: false, //If the planet has been generated
      collision: false, //If the rover has collided with an obstacle
      planetSize: '',
      xPosition: '',
      yPosition: '',
      facingDirection: '',
      obstacleDensity: '',
      possibleDirections: ['N', 'S', 'E', 'W'], //List of all the possible directions
      instructions: [], //Empty array to fill with the instructions
      possibleDensities: [
        //Densities for the obstacles
        { name: 'Low', value: 20 },
        { name: 'Medium', value: 40 },
        { name: 'High', value: 60 },
      ],
      terrain: {},
      //Rules for the inputs in the form
      sizeRules: [
        //Rules for the size of the planet
        (v) => !!v || 'A size is required',
        (v) => /\d$/.test(v) || 'This field must be a number',
        (v) => v >= 3 || 'The minimum allowed size is 3',
        (v) => v <= 20 || 'The maximum allowed size is 20',
      ],
      positionRules: [
        //Rules for X and Y positions
        (v) => !!v || 'A starting coordinate is required',
        (v) => /\d$/.test(v) || 'This field must be a number',
        (v) => v > 0 || 'The starting position needs to be inside of the planet limits',
        (v) => v <= parseInt(this.planetSize) || 'The starting position needs to be inside of the planet limits',
      ],
    }
  },

  methods: {
    submitInit() {
      if (!this.$refs.initData.validate()) return //if the data in the form is not valid, exit the function

      this.$axios //Send the initialization data to the APIs
        .post('initialize', {
          planetSize: parseInt(this.planetSize),
          planetObstacleDensity: parseInt(this.obstacleDensity),
          roverStartingX: parseInt(this.xPosition - 1),
          roverStartingY: parseInt(this.yPosition - 1),
          roverFacingDirection: this.facingDirection,
        })
        .then((response) => {
          this.terrain = response.data.terrain
        })
        .finally((this.generated = true))
    },
    displayItem(item) {
      //Based on which object is given by the APIs, return the appropriate image
      if (item.rover) return '/rover' + item.rover.facingDirection + '.png'
      if (item.empty) return 'empty.png'
      if (item.obstacle) return '/' + item.obstacle.name + '.png'
    },
    addInstruction(instruction) {
      //Add the single instruction to the array of instructions
      this.instructions.push(instruction)
    },
    sendInstructions() {
      //send instructions to the APIs
      this.collision = false

      this.$axios
        .post('move', { commands: this.instructions })
        .then((response) => {
          if (response.data.isCollided) this.collision = true
          this.terrain = response.data.planet.terrain
        })
        .finally((this.instructions = []))
    },
  },
}
</script>
