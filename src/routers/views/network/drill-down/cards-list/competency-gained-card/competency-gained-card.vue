/<template>
    <div id="card-container">
        <div id="competency-gained-container" @click="toggleCompetencyData">
            <div class="gained-header">
                <h4 class="gained-percentage">{{totalPerformances}} <span>%</span></h4>
                <h4 class="gained-counts">{{numberFormat(totalCompetency)}}</h4>
            </div>
            <div class="gained-footer">
                <span class="performance-title">Performance</span>
                <span class="competency-title">Competencies Gained</span>
            </div>
        </div>
        <div class="competency-gained-pullup" v-if="subjectsList.length && isShowCompetency && performanceData.data">
             <div class="backdrop" @click="toggleCompetencyData"></div>
            <competency-gained-pullup
             :subjectsList="subjectsList" 
             :selectedDate="selectedDate" 
             :countryData="countryData" 
             :performanceData="performanceData.data"
             :totalCompetencyGained="totalCompetencyGained"
             :totalPerformance ="totalPerformance"
             v-on:onSelectSubject="onSelectSubject"
             v-on:onGoBack="onGoBack"
             v-on:onSelectLevel="onSelectLevel" />
        </div>
    </div>
    
</template>

<script lang="ts" src="./competency-gained-card.ts"></script>
<style lang="scss" scoped src="./competency-gained-card.scss"></style>