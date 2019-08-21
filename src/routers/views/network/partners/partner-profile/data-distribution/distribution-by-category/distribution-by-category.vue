<template>
    <div  id="distribution-category-section">
        <div id="category-dountchart"></div>
        <div>
                <p>{{$t('distribution.by.category.subject')}}</p>
        <div id="subject-dount-tooltip">
            <p><b>{{$t('subject')}}</b> : {{categoryDountOverData.name}} </p>
            <p><b>{{$t('category')}}</b> : {{categoryDountOverData.category_id ? findCategoryNameById(categoryDountOverData.category_id) : ''}}</p>
            <p><b>{{$t('total.count')}}</b> : {{categoryDountOverData.total_count}}</p>
        </div>
         <div id="category-dount-tooltip">
            <p>{{categoryDountOverData.name}}</p>
        </div>
        </div>
    </div>
</template>


<script lang="ts" src="./distribution-by-category.ts"></script>
<style lang="scss" src="./distribution-by-category.scss"></style>
