#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CwCiCdStack } from '../lib/pipeline/cw_cicd_stack';

const app = new cdk.App();
new CwCiCdStack(app, 'CwCiCdStack', {
});

app.synth();